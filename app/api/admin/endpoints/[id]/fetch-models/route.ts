import { NextResponse } from "next/server";
import { getEndpointWithSecret, syncModelsForEndpoint } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const endpoint = await getEndpointWithSecret(params.id);
  if (!endpoint) {
    return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
  }

  let res: Response;
  try {
    res = await fetch(`${endpoint.baseUrl}/models`, {
      headers: { Authorization: `Bearer ${endpoint.apiKey}` },
      cache: "no-store",
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Could not reach ${endpoint.baseUrl}/models: ${(err as Error).message}` },
      { status: 502 }
    );
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: `Provider returned ${res.status} for GET /models. Add models manually instead.` },
      { status: 502 }
    );
  }

  const json = await res.json().catch(() => null);
  const list = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : null;
  if (!list) {
    return NextResponse.json(
      { error: "Unexpected response shape from provider's /models endpoint." },
      { status: 502 }
    );
  }

  const modelIds: string[] = list
    .map((m: unknown) => (typeof m === "string" ? m : (m as { id?: string })?.id))
    .filter((id: unknown): id is string => typeof id === "string" && id.length > 0);

  if (modelIds.length === 0) {
    return NextResponse.json({ error: "No models found in provider response." }, { status: 502 });
  }

  const addedModels = await syncModelsForEndpoint(endpoint.id, modelIds);
  return NextResponse.json({ fetched: modelIds.length, added: addedModels.length, addedModels });
}
