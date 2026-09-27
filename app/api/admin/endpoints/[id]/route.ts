import { NextResponse } from "next/server";
import { deleteEndpoint } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await deleteEndpoint(params.id);
  return NextResponse.json({ ok: true });
}
