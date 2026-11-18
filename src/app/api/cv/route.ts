import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { saveRecord } from "@/lib/storage/inbox";
import { ticketId } from "@/lib/utils";

export async function POST(request: Request) {
  const form = await request.formData();
  const required = ["Nombre", "Apellido", "TipoDocumento", "NroDocumento", "FechaNacimiento", "EstadoCivilID", "ExperienciaLaboral"];
  for (const key of required) {
    if (!String(form.get(key) ?? "").trim()) {
      return NextResponse.json({ error: "Los campos con asteriscos son obligatorios." }, { status: 400 });
    }
  }

  const id = ticketId("CV");
  const payload: Record<string, unknown> = {};
  form.forEach((value, key) => {
    if (typeof value === "string") payload[key] = value;
  });

  const uploads = path.join(process.cwd(), "data", "uploads", "cv");
  await mkdir(uploads, { recursive: true });

  for (const key of ["Archivo", "CurriculumPdf"]) {
    const file = form.get(key);
    if (file instanceof File && file.size > 0) {
      if (file.size > 2_000_000) {
        return NextResponse.json({ error: "El archivo supera el tamaño máximo permitido." }, { status: 400 });
      }
      const safeName = `${id}-${key}-${file.name.replace(/[^\w.\-]+/g, "_")}`;
      const bytes = Buffer.from(await file.arrayBuffer());
      await writeFile(path.join(uploads, safeName), bytes);
      payload[`${key}Stored`] = safeName;
    }
  }

  await saveRecord("cv", id, payload);
  return NextResponse.json({
    ok: true,
    id,
    message: "Recibimos su curriculum. Nos pondremos en contacto ni bien tengamos la necesidad.",
  });
}
