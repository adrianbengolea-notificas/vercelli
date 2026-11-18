import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { news } from "@/content/news";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Novedades" };

export default function NovedadesPage() {
  return (
    <div>
      <PageHero kicker="NOVEDADES" title="Últimas novedades en la empresa." image="/original/header/hdr_empresa.jpg" />
      <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
        {news.map((item) => (
          <article key={item.id} className="rounded-evhsa bg-white p-6 shadow-card">
            <h2 className="text-2xl font-semibold text-evhsa-red-deep">{item.title}</h2>
            <p className="mt-2 text-sm text-evhsa-muted">
              {item.date} - {item.brief}
            </p>
            <Link href={`/novedades/${item.slug}`} className="mt-4 inline-block font-semibold text-evhsa-red">
              Ver nota &gt;&gt;
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
