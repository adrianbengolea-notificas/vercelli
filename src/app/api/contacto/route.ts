import { NextResponse } from "next/server";
import { z } from "zod";
import { saveRecord } from "@/lib/storage/inbox";
import { ticketId } from "@/lib/utils";

const schema = z.object({
  Destino: z.enum(["CONSULTA", "RECLAMO", "SUGERENCIA", "OTRO"]),
  Asunto: z.string().min(2),
  Nombre: z.string().min(2),
  Apellido: z.string().min(2),
  Email: z.string().email(),
  Telefono: z.string().optional(),
  Mensaje: z.string().min(5),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Complete los campos obligatorios." }, { status: 400 });
  }
  const id = ticketId(parsed.data.Destino === "CONSULTA" ? "CON" : parsed.data.Destino.slice(0, 3));
  const record = await saveRecord("contacto", id, parsed.data);
  return NextResponse.json({
    ok: true,
    id: record.id,
    message: "Recibimos su mensaje. Nos pondremos en contacto con usted en breve.",
  });
}
