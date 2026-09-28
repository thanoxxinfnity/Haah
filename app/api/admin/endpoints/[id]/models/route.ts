import { NextRequest, NextResponse } from "next/server";
import { getEndpointWithSecret, syncModelsForEndpoint } from "@/lib/store";

// Manual fallback for providers that don't expose GET /models.
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const endpoint = await getEndpointWithSecret(params.id);
  if (!endpoint) {
    return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
  }
  const body = await req.json().catch(() => null);
  const modelId = typeof body?.modelId === "string" ? body.modelId.trim() : "";
  if (!modelId) {
    return NextResponse.json({ error: "modelId is required" }, { status: 400 });
  }
  const addedModels = await syncModelsForEndpoint(endpoint.id, [modelId]);
  return NextResponse.json({ added: addedModels.length, addedModels });
}
