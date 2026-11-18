import { NextResponse } from "next/server";
import { getGpsLines } from "@/lib/official-data";

export async function GET() {
  const data = await getGpsLines();
  return NextResponse.json({ data });
}
