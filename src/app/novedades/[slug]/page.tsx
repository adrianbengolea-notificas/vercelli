import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { news } from "@/content/news";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  return { title: item?.title ?? "Novedad" };
}

export default async function NovedadPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();
  return (
    <div>
      <PageHero kicker="NOVEDADES" title={item.title} description={item.brief} image="/original/header/hdr_empresa.jpg" />
      <article className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
        <p className="text-sm text-evhsa-muted">{item.date} · vigencia publicada hasta {item.validUntil}</p>
        <p className="mt-6 text-lg leading-8 text-evhsa-muted">{item.description}</p>
        <p className="mt-6 text-sm">
          Cuentas oficiales: <a className="underline" href={site.social.instagram}>Instagram</a> y <a className="underline" href={site.social.facebook}>Facebook</a>.
        </p>
      </article>
    </div>
  );
}
