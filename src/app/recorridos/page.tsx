import { PageHero } from "@/components/layout/PageHero";
import { RouteExplorer } from "@/components/maps/RouteExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Recorridos" };

export default function RecorridosPage() {
  return (
    <div>
      <PageHero kicker="RECORRIDOS" title="RECORRIDOS." description="Mapa interactivo con ramales oficiales. Si no hay coordenadas, no se dibuja un trazado inventado." />
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <RouteExplorer />
      </div>
    </div>
  );
}
