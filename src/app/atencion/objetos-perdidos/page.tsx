import { PageHero } from "@/components/layout/PageHero";
import { LostObjectForm } from "@/components/forms/LostObjectForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Objetos perdidos" };

export default function ObjetosPerdidosPage() {
  return (
    <div>
      <PageHero
        kicker="OBJETOS PERDIDOS"
        title="ENVIENOS INFORMACIÓN SOBRE EL OBJETO QUE HA PERDIDO."
        image="/original/header/hdr_objetosperdidos.jpg"
      />
      <div className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
        <LostObjectForm />
      </div>
    </div>
  );
}
