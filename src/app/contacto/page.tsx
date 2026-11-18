import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contacto" };

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ m?: string }>;
}) {
  const { m } = await searchParams;
  const destino = m === "RECLAMO" ? "RECLAMO" : m === "SUGERENCIA" ? "SUGERENCIA" : "CONSULTA";
  return (
    <div>
      <PageHero kicker="CONTACTO" title={destino === "RECLAMO" ? "RECLAMOS Y SUGERENCIAS" : "REALICE SU CONSULTA"} description="Muchas gracias por comunicarse con nosotros. Complete el formulario y nos pondremos en contacto con usted en breve." image="/original/header/hdr_contacto.jpg" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_320px] lg:px-6">
        <ContactForm defaultDestino={destino} />
        <aside className="rounded-evhsa bg-white p-5 shadow-card">
          <h2 className="font-semibold">NUESTRA UBICACIÓN</h2>
          <p className="mt-3 text-sm text-evhsa-muted">{site.address}</p>
          <p className="mt-2 text-sm">Tel. {site.phoneMain} / {site.phoneSchedules}</p>
          <p className="mt-2 text-sm">{site.email}</p>
          <iframe
            title="Mapa EVHSA"
            className="mt-4 h-80 w-full rounded-2xl"
            src="https://maps.google.com/maps?q=vercelli+san+nicolas&t=k&z=17&ie=UTF8&iwloc=&output=embed"
          />
        </aside>
      </div>
    </div>
  );
}
