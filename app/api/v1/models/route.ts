import { NextRequest, NextResponse } from "next/server";
import { listPublicModels, verifyPlatformKey } from "@/lib/store";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization") ?? "";
  const key = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const authorized = await verifyPlatformKey(key);
  if (!authorized) {
    return NextResponse.json({ error: { message: "Invalid API key" } }, { status: 401, headers: CORS_HEADERS });
  }

  const models = await listPublicModels();
  return NextResponse.json(
    { object: "list", data: models.map((m) => ({ id: m.id, object: "model", owned_by: m.owned_by })) },
    { headers: CORS_HEADERS }
  );
}
