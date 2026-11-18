import { ScheduleExplorer } from "@/components/schedules/ScheduleExplorer";
import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horarios",
  description: "Cronograma de horarios por línea de EVHSA, con datos oficiales programados.",
};

export default async function HorariosPage({
  searchParams,
}: {
  searchParams: Promise<{ linea?: string; fecha?: string }>;
}) {
  const params = await searchParams;
  return (
    <div>
      <PageHero
        kicker="HORARIOS"
        title="Cronograma de horarios por línea."
        description="Filtros por fecha y línea, igual que el sitio original, con una interfaz moderna. Solo se muestran horarios programados oficiales."
        image="/original/header/hdr_horarios.jpg"
      />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <ScheduleExplorer initialLine={params.linea} initialDate={params.fecha} />
      </div>
    </div>
  );
}
