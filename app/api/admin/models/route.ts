import { NextResponse } from "next/server";
import { listModels } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const models = await listModels();
  return NextResponse.json({ models });
}
