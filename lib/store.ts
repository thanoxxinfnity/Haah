import { put, list } from "@vercel/blob";
import { emptyConfig, type Endpoint, type GatewayConfig, type ModelEntry, type PlatformKey } from "./types";
import { randomId, slugify, sha256Hex, generateApiKey } from "./crypto";
import { encryptSecret, decryptSecret } from "./secret";

const CONFIG_PATH = "config/store.json";

async function findConfigBlobUrl(): Promise<string | null> {
  const { blobs } = await list({ prefix: CONFIG_PATH, limit: 10 });
  const match = blobs.find((b) => b.pathname === CONFIG_PATH);
  return match ? match.url : null;
}

export async function getConfig(): Promise<GatewayConfig> {
  const url = await findConfigBlobUrl();
  if (!url) return structuredClone(emptyConfig);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return structuredClone(emptyConfig);
  const data = (await res.json()) as Partial<GatewayConfig>;
  return {
    endpoints: data.endpoints ?? [],
    models: data.models ?? [],
    keys: data.keys ?? [],
  };
}

async function saveConfig(config: GatewayConfig): Promise<void> {
  await put(CONFIG_PATH, JSON.stringify(config), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

async function mutateConfig<T>(fn: (config: GatewayConfig) => T | Promise<T>): Promise<T> {
  const config = await getConfig();
  const result = await fn(config);
  await saveConfig(config);
  return result;
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

export async function listModels(): Promise<(ModelEntry & { endpointName: string; endpointSlug: string })[]> {
  const config = await getConfig();
  const byId = new Map(config.endpoints.map((e) => [e.id, e]));
  return config.models
    .map((m) => {
      const ep = byId.get(m.endpointId);
      return { ...m, endpointName: ep?.name ?? "unknown", endpointSlug: ep?.slug ?? "unknown" };
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

/** Upserts fetched model ids for an endpoint. New ones start disabled. */
export async function syncModelsForEndpoint(endpointId: string, modelIds: string[]): Promise<number> {
  return mutateConfig((config) => {
    const endpoint = config.endpoints.find((e) => e.id === endpointId);
    if (!endpoint) throw new Error("Endpoint not found");
    const existingIds = new Set(config.models.filter((m) => m.endpointId === endpointId).map((m) => m.modelId));
    let added = 0;
    for (const modelId of modelIds) {
      if (existingIds.has(modelId)) continue;
      config.models.push({
        id: `${endpoint.slug}/${modelId}`,
        endpointId,
        modelId,
        enabled: false,
        addedAt: Date.now(),
      });
      added++;
    }
    return added;
  });
}

export async function setModelEnabled(id: string, enabled: boolean): Promise<void> {
  await mutateConfig((config) => {
    const model = config.models.find((m) => m.id === id);
    if (model) model.enabled = enabled;
  });
}

export async function bulkSetEnabled(ids: string[] | "all", enabled: boolean, endpointId?: string): Promise<number> {
  return mutateConfig((config) => {
    let count = 0;
    for (const m of config.models) {
      if (endpointId && m.endpointId !== endpointId) continue;
      if (ids !== "all" && !ids.includes(m.id)) continue;
      if (m.enabled !== enabled) count++;
      m.enabled = enabled;
    }
    return count;
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

export async function listKeys(): Promise<Omit<PlatformKey, "hash">[]> {
  const config = await getConfig();
  return config.keys
    .map(({ hash, ...rest }) => rest)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export async function createKey(name: string): Promise<{ id: string; plaintext: string }> {
  const { plaintext, hash, prefix } = generateApiKey();
  const key: PlatformKey = {
    id: randomId("key"),
    name: name.trim() || "Unnamed key",
    hash,
    prefix,
    createdAt: Date.now(),
  };
  await mutateConfig((config) => {
    config.keys.push(key);
  });
  return { id: key.id, plaintext };
}

export async function deleteKey(id: string): Promise<void> {
  await mutateConfig((config) => {
    config.keys = config.keys.filter((k) => k.id !== id);
  });
}

/** Verifies a caller-supplied platform key against stored hashes. */
export async function verifyPlatformKey(plaintext: string): Promise<boolean> {
  if (!plaintext) return false;
  const hash = sha256Hex(plaintext);
  const config = await getConfig();
  return config.keys.some((k) => k.hash === hash);
}
