import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { gallery } from "@/content/gallery";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Galería de fotos" };

export default function GaleriaPage() {
  return (
    <div>
      <PageHero kicker="GALERÍA" title="GALERÍA DE FOTOS." image="/original/header/img_header_antecedentes.jpg" />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-2 lg:px-6">
        {gallery.map((item) => (
          <figure key={item.src} className="overflow-hidden rounded-evhsa bg-white shadow-card">
            <Image src={item.src} alt={item.alt} width={1400} height={900} className="h-80 w-full object-cover" />
            <figcaption className="p-4">
              <strong>{item.title}</strong>
              {item.description ? <p className="mt-1 text-sm text-evhsa-muted">{item.description}</p> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
