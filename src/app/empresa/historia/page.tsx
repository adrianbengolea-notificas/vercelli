import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { historia } from "@/data/institutional";

export const metadata = { title: "Nuestra Historia" };

export default function HistoriaPage() {
  return (
    <>
      <PageHero eyebrow={historia.menu} title={historia.submenu} image={historia.image} />
      <article className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
        <div className="mb-10 grid gap-4 md:grid-cols-2">
          {historia.photos.map((photo) => (
            <Image key={photo.src} src={photo.src} alt={photo.alt} width={640} height={420} className="rounded-evhsa border" />
          ))}
        </div>
        <ol className="mb-10 grid gap-3 md:grid-cols-3">
          {historia.timeline.map((item) => (
            <li key={item.year} className="rounded-2xl border border-evhsa-line bg-white p-4">
              <p className="font-bold text-evhsa-red">{item.year}</p>
              <p className="mt-1 text-sm text-evhsa-muted">{item.text}</p>
            </li>
          ))}
        </ol>
        <div className="prose-evhsa">
          {historia.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
        </div>
      </article>
    </>
  );
}
