import { NextRequest, NextResponse } from "next/server";
import { addEndpoint, listEndpoints } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const endpoints = await listEndpoints();
  return NextResponse.json({ endpoints });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const baseUrl = typeof body?.baseUrl === "string" ? body.baseUrl.trim() : "";
  const apiKey = typeof body?.apiKey === "string" ? body.apiKey.trim() : "";

  if (!name || !baseUrl || !apiKey) {
    return NextResponse.json({ error: "name, baseUrl and apiKey are required" }, { status: 400 });
  }
  try {
    new URL(baseUrl);
  } catch {
    return NextResponse.json({ error: "baseUrl must be a valid URL" }, { status: 400 });
  }

  const endpoint = await addEndpoint(name, baseUrl, apiKey);
  return NextResponse.json({ endpoint }, { status: 201 });
}
