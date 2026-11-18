import { notFound } from "next/navigation";
import { InstitutionalView } from "@/components/content/InstitutionalView";
import { institutionalPages } from "@/content/institutional";
import type { Metadata } from "next";

export function generateStaticParams() {
  return institutionalPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = institutionalPages.find((item) => item.slug === slug);
  return { title: page?.title ?? "Empresa" };
}

export default async function EmpresaSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = institutionalPages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <InstitutionalView page={page} />;
}
