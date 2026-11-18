import { NextResponse } from "next/server";
import { z } from "zod";
import { saveRecord } from "@/lib/storage/inbox";
import { ticketId } from "@/lib/utils";

const schema = z.object({
  FechaPerdida: z.string().min(4),
  LineaID: z.string().min(1),
  RubroID: z.string().min(1),
  DNI: z.string().min(6),
  NombreApellido: z.string().min(3),
  Contacto: z.string().optional(),
  Email: z.string().email(),
  Descripcion: z.string().min(4),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Complete los datos necesarios para rastrear el objeto." }, { status: 400 });
  }
  const id = ticketId("OBJ");
  await saveRecord("objetos-perdidos", id, parsed.data);
  return NextResponse.json({
    ok: true,
    id,
    message: "Recibimos la información del objeto. Nos pondremos en contacto a la brevedad.",
  });
}
