import { NextResponse } from "next/server";
import { getStopsByRamal } from "@/lib/official-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ramal = searchParams.get("ramal") ?? "";
  const sentido = (searchParams.get("sentido") ?? "ida") as "ida" | "vuelta";
  if (!ramal) return NextResponse.json({ error: "Ramal requerido" }, { status: 400 });
  const data = await getStopsByRamal(ramal, sentido);
  return NextResponse.json({
    source: "https://gpsevhsa.com/paradasbysentidoramal",
    ramal,
    sentido,
    data,
  });
}
