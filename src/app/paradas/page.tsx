import { PageHero } from "@/components/layout/PageHero";
import { StopsExplorer } from "@/components/maps/StopsExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Paradas" };

export default function ParadasPage() {
  return (
    <div>
      <PageHero kicker="PARADAS" title="Lista de Paradas por línea." description="Misma consulta oficial del sitio original, con tabla adaptable y mapa cuando existan coordenadas." />
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <StopsExplorer />
      </div>
    </div>
  );
}
