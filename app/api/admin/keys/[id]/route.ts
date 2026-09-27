import { NextResponse } from "next/server";
import { deleteKey } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await deleteKey(params.id);
  return NextResponse.json({ ok: true });
}
