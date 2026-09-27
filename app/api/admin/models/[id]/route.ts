import { NextRequest, NextResponse } from "next/server";
import { removeModel, setModelEnabled } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json().catch(() => null);
  if (typeof body?.enabled !== "boolean") {
    return NextResponse.json({ error: "enabled (boolean) is required" }, { status: 400 });
  }
  await setModelEnabled(decodeURIComponent(params.id), body.enabled);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await removeModel(decodeURIComponent(params.id));
  return NextResponse.json({ ok: true });
}
