import { NextRequest, NextResponse } from "next/server";
import { resolveEnabledModel, verifyPlatformKey } from "@/lib/store";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  const auth = req.headers.get("authorization") ?? "";
  const key = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const authorized = await verifyPlatformKey(key);
  if (!authorized) {
    return NextResponse.json({ error: { message: "Invalid API key" } }, { status: 401, headers: CORS_HEADERS });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.model !== "string") {
    return NextResponse.json(
      { error: { message: "Request body must be JSON with a 'model' field, e.g. \"myprovider/gpt-4o\"" } },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const resolved = await resolveEnabledModel(body.model);
  if (!resolved) {
    return NextResponse.json(
      { error: { message: `Model '${body.model}' is not registered or not enabled on this gateway.` } },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  const { model, endpoint } = resolved;
  const upstreamPath = params.path.join("/");
  const upstreamBody = { ...body, model: model.modelId };

  let upstream: Response;
  try {
    upstream = await fetch(`${endpoint.baseUrl}/${upstreamPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${endpoint.apiKey}`,
      },
      body: JSON.stringify(upstreamBody),
    });
  } catch (err) {
    return NextResponse.json(
      { error: { message: `Upstream request failed: ${(err as Error).message}` } },
      { status: 502, headers: CORS_HEADERS }
    );
  }

  const headers = new Headers(CORS_HEADERS);
  const contentType = upstream.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  return new NextResponse(upstream.body, { status: upstream.status, headers });
}
