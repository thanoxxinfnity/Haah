import { NextRequest, NextResponse } from "next/server";
import { createKey, listKeys } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const keys = await listKeys();
  return NextResponse.json({ keys });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name : "";
  const { id, plaintext } = await createKey(name);
  return NextResponse.json({ id, key: plaintext }, { status: 201 });
}
