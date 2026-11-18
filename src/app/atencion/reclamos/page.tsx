import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Reclamos y sugerencias" };

export default function ReclamosPage() {
  return (
    <div>
      <PageHero
        kicker="RECLAMOS Y SUGERENCIAS"
        title="RECLAMOS Y SUGERENCIAS"
        description="Complete el formulario original. Cada solicitud recibe un identificador. El seguimiento posterior lo realiza el equipo de EVHSA; no se promete un sistema automático de tickets."
        image="/original/header/hdr_reclamos.jpg"
      />
      <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
        <ContactForm defaultDestino="RECLAMO" />
      </div>
    </div>
  );
}
