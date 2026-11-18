import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "RRHH" };

export default function RrhhPage() {
  return (
    <div>
      <PageHero kicker="RRHH" title="Recursos humanos" description="Estamos en constante búsqueda de nuevos valores para nuestra empresa." image="/original/header/hdr_ccv.jpg" />
      <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
        <Link href="/rrhh/cargar-cv" className="inline-flex rounded-full bg-evhsa-red px-6 py-3 font-semibold text-white">
          Cargar Curriculum Vitae
        </Link>
      </div>
    </div>
  );
}
