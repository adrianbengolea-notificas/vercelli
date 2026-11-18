import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { quienesSomos } from "@/data/institutional";

export const metadata = { title: "Quiénes somos" };

export default function QuienesSomosPage() {
  return (
    <>
      <PageHero eyebrow={quienesSomos.menu} title={quienesSomos.submenu} image={quienesSomos.image} />
      <article className="mx-auto grid max-w-5xl gap-8 px-4 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-6">
        <div className="prose-evhsa">
          <p>{quienesSomos.intro}</p>
          <p>{quienesSomos.areasTitle}</p>
          <ul>{quienesSomos.areas.map((item) => <li key={item}>{item}</li>)}</ul>
          <p>{quienesSomos.closing}</p>
          <p>{quienesSomos.plusTitle}</p>
          <ul>{quienesSomos.plus.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <Image src={quienesSomos.photo.src} alt={quienesSomos.photo.alt} width={640} height={480} className="rounded-evhsa border" />
      </article>
    </>
  );
}
