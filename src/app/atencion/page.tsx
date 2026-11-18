import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Atención al usuario" };

const items = [
  { href: "/atencion/objetos-perdidos", title: "Objetos perdidos", text: "Informe un objeto extraviado o consulte el listado publicado." },
  { href: "/atencion/reclamos", title: "Reclamos y sugerencias", text: "Complete el formulario original de reclamo o sugerencia." },
  { href: "/atencion/preguntas-frecuentes", title: "Preguntas frecuentes", text: "SUBE, Mi Boleto y gestiones de usuarios." },
  { href: "/contacto", title: "Contacto", text: "Consultas generales a EVHSA." },
];

export default function AtencionPage() {
  return (
    <div>
      <PageHero kicker="ATENCIÓN AL USUARIO" title="Canales de atención" />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 md:grid-cols-2 lg:px-6">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-evhsa bg-white p-6 shadow-card">
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <p className="mt-2 text-evhsa-muted">{item.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
