import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { calidad } from "@/data/institutional";

export const metadata = { title: "Normas y políticas de calidad" };

export default function CalidadPage() {
  return (
    <>
      <PageHero eyebrow={calidad.menu} title={calidad.submenu} image={calidad.image} />
      <article className="prose-evhsa mx-auto max-w-4xl px-4 py-10 lg:px-6">
        <p>{calidad.paragraphs[0]}</p>
        <p>{calidad.paragraphs[1]}</p>
        <Image src={calidad.isoImage.src} alt={calidad.isoImage.alt} width={720} height={360} className="my-6 rounded-evhsa border" />
        <p>{calidad.paragraphs[2]}</p>
        <ul>{calidad.items.map((item) => <li key={item}>{item}</li>)}</ul>
        <p>{calidad.closing}</p>
      </article>
    </>
  );
}
