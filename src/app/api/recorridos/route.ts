import { NextResponse } from "next/server";
import { getRouteByRamal } from "@/lib/official-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ramal = searchParams.get("ramal") ?? "";
  if (!ramal) return NextResponse.json({ error: "Ramal requerido" }, { status: 400 });
  const data = await getRouteByRamal(ramal);
  return NextResponse.json({
    source: "https://www.e-evhsa.com.ar/Recorridos/getRecorridosToWeb/",
    ramal,
    data,
  });
}
