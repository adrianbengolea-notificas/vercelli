import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { listRecords } from "@/lib/storage/inbox";

export async function GET() {
  const jar = await cookies();
  if (jar.get("evhsa_admin")?.value !== "1") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const records = await listRecords();
  return NextResponse.json({ records });
}
