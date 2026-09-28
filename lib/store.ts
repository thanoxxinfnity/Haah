import { put, list, del } from "@vercel/blob";
import { emptyConfig, type Endpoint, type GatewayConfig, type ModelEntry, type PlatformKey } from "./types";
import { randomId, slugify, sha256Hex, generateApiKey } from "./crypto";
import { encryptSecret, decryptSecret } from "./secret";

// Every write goes to a brand-new, never-before-served pathname instead of
// overwriting "config/store.json" in place. Vercel Blob's public URLs sit
// behind a CDN edge that can serve a stale cached copy of an overwritten
// object for up to a minute or more; a URL that has never been requested
// before has nothing stale to serve, so this sidesteps the problem instead
// of fighting the CDN with cache-control headers (which didn't help).
const CONFIG_PREFIX = "config/store-";
const VERSIONS_TO_KEEP = 3;

async function findLatestConfigBlob(): Promise<{ url: string; pathname: string } | null> {
  const { blobs } = await list({ prefix: CONFIG_PREFIX, limit: 1000 });
  if (blobs.length === 0) return null;
  const latest = blobs.reduce((a, b) => (a.uploadedAt > b.uploadedAt ? a : b));
  return { url: latest.url, pathname: latest.pathname };
}

async function fetchConfigFromUrl(url: string): Promise<GatewayConfig> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return structuredClone(emptyConfig);
  const data = (await res.json()) as Partial<GatewayConfig>;
  return {
    endpoints: data.endpoints ?? [],
    models: data.models ?? [],
    keys: data.keys ?? [],
  };
}

export async function getConfig(): Promise<GatewayConfig> {
  const latest = await findLatestConfigBlob();
  if (!latest) return structuredClone(emptyConfig);
  return fetchConfigFromUrl(latest.url);
}

async function saveConfig(config: GatewayConfig): Promise<void> {
  const pathname = `${CONFIG_PREFIX}${Date.now()}-${Math.random().toString(36).slice(2, 8)}.json`;
  await put(pathname, JSON.stringify(config), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 31536000,
  });

  // The list() index can lag the put() above by a beat. Confirm our new
  // blob is actually indexed before returning, so the request that
  // triggered this write (or one right behind it) is guaranteed to see it.
  for (let attempt = 0; attempt < 5; attempt++) {
    const { blobs } = await list({ prefix: CONFIG_PREFIX, limit: 1000 });
    if (blobs.some((b) => b.pathname === pathname)) break;
    await new Promise((r) => setTimeout(r, 150));
  }

  // Prune older versions so the store doesn't grow unbounded. Best-effort —
  // a failed cleanup never breaks the write that matters.
  try {
    const { blobs } = await list({ prefix: CONFIG_PREFIX, limit: 1000 });
    const stale = blobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()).slice(VERSIONS_TO_KEEP);
    if (stale.length > 0) await del(stale.map((b) => b.url));
  } catch {
    // ignore — a stray old version is harmless
  }
}

/** Read-modify-write with optimistic concurrency: if another write lands
 *  between our read and our write, we'd otherwise save a copy that's
 *  missing that write (a lost update — this is how earlier test traffic
 *  briefly wiped out real data). We re-check the base version right before
 *  saving and retry against fresh state if it moved. */
async function mutateConfig<T>(fn: (config: GatewayConfig) => T | Promise<T>): Promise<T> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const base = await findLatestConfigBlob();
    const config = base ? await fetchConfigFromUrl(base.url) : structuredClone(emptyConfig);
    const result = await fn(config);

    const stillLatest = await findLatestConfigBlob();
    if (stillLatest?.pathname !== base?.pathname) {
      // Someone else wrote in between — discard our result and retry
      // against the newer state rather than overwriting their change.
      await new Promise((r) => setTimeout(r, 50 + Math.random() * 100));
      continue;
    }

    await saveConfig(config);
    return result;
  }
  throw new Error("Too much concurrent write contention on the gateway config — please retry.");
}

// ---------- Endpoints ----------

export type EndpointPublic = Omit<Endpoint, "apiKeyEnc"> & { keyPreview: string };

function toPublicEndpoint(e: Endpoint): EndpointPublic {
  const { apiKeyEnc, ...rest } = e;
  return { ...rest, keyPreview: "••••••••" };
}

export async function listEndpoints(): Promise<EndpointPublic[]> {
  const config = await getConfig();
  return config.endpoints.map(toPublicEndpoint).sort((a, b) => b.createdAt - a.createdAt);
}

export async function addEndpoint(name: string, baseUrl: string, apiKey: string): Promise<EndpointPublic> {
  return mutateConfig((config) => {
    const cleanBaseUrl = baseUrl.trim().replace(/\/+$/, "");
    let slug = slugify(name);
    if (config.endpoints.some((e) => e.slug === slug)) {
      slug = `${slug}-${randomId("", 2).slice(1)}`;
    }
    const endpoint: Endpoint = {
      id: randomId("ep"),
      name: name.trim(),
      slug,
      baseUrl: cleanBaseUrl,
      apiKeyEnc: encryptSecret(apiKey.trim()),
      createdAt: Date.now(),
    };
    config.endpoints.push(endpoint);
    return toPublicEndpoint(endpoint);
  });
}

export async function deleteEndpoint(id: string): Promise<void> {
  await mutateConfig((config) => {
    config.endpoints = config.endpoints.filter((e) => e.id !== id);
    config.models = config.models.filter((m) => m.endpointId !== id);
  });
}

export async function getEndpointWithSecret(id: string): Promise<(Endpoint & { apiKey: string }) | null> {
  const config = await getConfig();
  const endpoint = config.endpoints.find((e) => e.id === id);
  if (!endpoint) return null;
  return { ...endpoint, apiKey: decryptSecret(endpoint.apiKeyEnc) };
}

// ---------- Models ----------

export type ModelPublic = ModelEntry & { endpointName: string; endpointSlug: string };

function enrichModel(m: ModelEntry, config: GatewayConfig): ModelPublic {
  const ep = config.endpoints.find((e) => e.id === m.endpointId);
  return { ...m, endpointName: ep?.name ?? "unknown", endpointSlug: ep?.slug ?? "unknown" };
}

export async function listModels(): Promise<ModelPublic[]> {
  const config = await getConfig();
  return config.models.map((m) => enrichModel(m, config)).sort((a, b) => a.id.localeCompare(b.id));
}

/** Upserts fetched model ids for an endpoint. New ones start disabled.
 *  Returns the newly-added models so callers can update UI state without
 *  re-reading (the underlying store is only eventually consistent). */
export async function syncModelsForEndpoint(endpointId: string, modelIds: string[]): Promise<ModelPublic[]> {
  return mutateConfig((config) => {
    const endpoint = config.endpoints.find((e) => e.id === endpointId);
    if (!endpoint) throw new Error("Endpoint not found");
    const existingIds = new Set(config.models.filter((m) => m.endpointId === endpointId).map((m) => m.modelId));
    const added: ModelEntry[] = [];
    for (const modelId of modelIds) {
      if (existingIds.has(modelId)) continue;
      const entry: ModelEntry = {
        id: `${endpoint.slug}/${modelId}`,
        endpointId,
        modelId,
        enabled: false,
        addedAt: Date.now(),
        requestCount: 0,
        lastUsedAt: null,
      };
      config.models.push(entry);
      added.push(entry);
    }
    return added.map((m) => enrichModel(m, config));
  });
}

export async function setModelEnabled(id: string, enabled: boolean): Promise<void> {
  await mutateConfig((config) => {
    const model = config.models.find((m) => m.id === id);
    if (model) model.enabled = enabled;
  });
}

export async function bulkSetEnabled(ids: string[] | "all", enabled: boolean, endpointId?: string): Promise<string[]> {
  return mutateConfig((config) => {
    const changed: string[] = [];
    for (const m of config.models) {
      if (endpointId && m.endpointId !== endpointId) continue;
      if (ids !== "all" && !ids.includes(m.id)) continue;
      if (m.enabled !== enabled) changed.push(m.id);
      m.enabled = enabled;
    }
    return changed;
  });
}

export async function removeModel(id: string): Promise<void> {
  await mutateConfig((config) => {
    config.models = config.models.filter((m) => m.id !== id);
  });
}

export async function resolveEnabledModel(modelId: string) {
  const config = await getConfig();
  const model = config.models.find((m) => m.id === modelId && m.enabled);
  if (!model) return null;
  const endpoint = config.endpoints.find((e) => e.id === model.endpointId);
  if (!endpoint) return null;
  return {
    model,
    endpoint: { ...endpoint, apiKey: decryptSecret(endpoint.apiKeyEnc) },
  };
}

export async function listPublicModels(): Promise<{ id: string; owned_by: string }[]> {
  const config = await getConfig();
  const byId = new Map(config.endpoints.map((e) => [e.id, e]));
  return config.models
    .filter((m) => m.enabled)
    .map((m) => ({ id: m.id, owned_by: byId.get(m.endpointId)?.slug ?? "unknown" }));
}

// ---------- Platform API keys ----------

export type KeyPublic = Omit<PlatformKey, "hash">;

function toPublicKey(k: PlatformKey): KeyPublic {
  const { hash, ...rest } = k;
  return rest;
}

export async function listKeys(): Promise<KeyPublic[]> {
  const config = await getConfig();
  return config.keys.map(toPublicKey).sort((a, b) => b.createdAt - a.createdAt);
}

export async function createKey(name: string): Promise<{ key: KeyPublic; plaintext: string }> {
  const { plaintext, hash, prefix } = generateApiKey();
  const key: PlatformKey = {
    id: randomId("key"),
    name: name.trim() || "Unnamed key",
    hash,
    prefix,
    createdAt: Date.now(),
    requestCount: 0,
    lastUsedAt: null,
  };
  await mutateConfig((config) => {
    config.keys.push(key);
  });
  return { key: toPublicKey(key), plaintext };
}

export async function deleteKey(id: string): Promise<void> {
  await mutateConfig((config) => {
    config.keys = config.keys.filter((k) => k.id !== id);
  });
}

/** Verifies a caller-supplied platform key against stored hashes, returning
 *  its id (for usage tracking) or null if invalid/revoked. */
export async function resolvePlatformKey(plaintext: string): Promise<{ id: string } | null> {
  if (!plaintext) return null;
  const hash = sha256Hex(plaintext);
  const config = await getConfig();
  const key = config.keys.find((k) => k.hash === hash);
  return key ? { id: key.id } : null;
}

/** Bumps request counters for a key + model after a successful gateway call. */
export async function recordUsage(keyId: string, modelId: string): Promise<void> {
  await mutateConfig((config) => {
    const key = config.keys.find((k) => k.id === keyId);
    if (key) {
      key.requestCount += 1;
      key.lastUsedAt = Date.now();
    }
    const model = config.models.find((m) => m.id === modelId);
    if (model) {
      model.requestCount += 1;
      model.lastUsedAt = Date.now();
    }
  });
}
