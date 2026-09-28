import { NextRequest, NextResponse } from "next/server";
import { bulkSetEnabled } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const enabled = body?.enabled;
  if (typeof enabled !== "boolean") {
    return NextResponse.json({ error: "enabled (boolean) is required" }, { status: 400 });
  }
  const ids: string[] | "all" = Array.isArray(body?.ids) ? body.ids : "all";
  const endpointId: string | undefined = typeof body?.endpointId === "string" ? body.endpointId : undefined;

  const changedIds = await bulkSetEnabled(ids, enabled, endpointId);
  return NextResponse.json({ updated: changedIds.length, changedIds });
}
