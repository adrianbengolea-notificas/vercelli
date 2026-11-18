import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ScheduleImport } from "@/components/admin/ScheduleImport";

export default async function AdminHorariosPage() {
  const jar = await cookies();
  if (jar.get("evhsa_admin")?.value !== "1") redirect("/admin/login");
  return (
    <div>
      <h1 className="font-display text-3xl">Administrar horarios</h1>
      <p className="mt-2 max-w-3xl text-sm text-evhsa-muted">
        Importe CSV o Excel. La vista previa se muestra antes de publicar. No se calculan horarios estimados: solo se aceptan filas con línea, fecha, cabecera y hora programada.
      </p>
      <ScheduleImport />
    </div>
  );
}
