import { NextResponse } from "next/server";
import { getOfficialSchedule, listOfficialLines } from "@/lib/official-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const linea = searchParams.get("linea") ?? "";
  const fecha = searchParams.get("fecha") ?? "";
  const allowed = listOfficialLines() as string[];

  if (!allowed.includes(linea) || !fecha) {
    return NextResponse.json({ error: "Línea o fecha inválida" }, { status: 400 });
  }

  const data = await getOfficialSchedule(linea, fecha);
  return NextResponse.json(data);
}
