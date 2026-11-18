import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { institutionalPages, timeline } from "@/content/institutional";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Empresa" };

export default function EmpresaPage() {
  return (
    <div>
      <PageHero kicker="EMPRESA" title="EMPRESA VERCELLI HNOS S.A." description="Antecedentes, historia, objetivos, quiénes somos, el servicio y normas de calidad." image="/original/header/hdr_empresa.jpg" />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {institutionalPages.map((page) => (
            <Link key={page.slug} href={`/empresa/${page.slug}`} className="rounded-evhsa bg-white p-6 shadow-card">
              <p className="text-xs uppercase tracking-widest text-evhsa-red">{page.kicker}</p>
              <h2 className="mt-2 text-2xl font-semibold">{page.heading}</h2>
            </Link>
          ))}
        </div>
        <section className="mt-12">
          <h2 className="font-display text-3xl">Línea de tiempo histórica</h2>
          <ol className="mt-6 space-y-4">
            {timeline.map((item) => (
              <li key={item.year} className="grid gap-2 rounded-2xl bg-white p-4 md:grid-cols-[100px_1fr]">
                <strong className="text-evhsa-red">{item.year}</strong>
                <span className="text-evhsa-muted">{item.text}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
