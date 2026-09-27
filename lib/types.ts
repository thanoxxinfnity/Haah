export type Endpoint = {
  id: string;
  name: string;
  slug: string;
  baseUrl: string;
  apiKeyEnc: string; // encrypted provider API key, see lib/secret.ts
  createdAt: number;
};

export type ModelEntry = {
  id: string; // `${endpointSlug}/${modelId}` — what callers pass as "model"
  endpointId: string;
  modelId: string; // raw provider-side model id
  enabled: boolean;
  addedAt: number;
};

export type PlatformKey = {
  id: string;
  name: string;
  hash: string;
  prefix: string;
  createdAt: number;
};

export type GatewayConfig = {
  endpoints: Endpoint[];
  models: ModelEntry[];
  keys: PlatformKey[];
};

export const emptyConfig: GatewayConfig = {
  endpoints: [],
  models: [],
  keys: [],
};
