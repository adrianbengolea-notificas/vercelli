import { PageHero } from "@/components/ui/PageHero";
import { objetivos } from "@/data/institutional";

export const metadata = { title: "Objetivos" };

export default function ObjetivosPage() {
  return (
    <>
      <PageHero eyebrow={objetivos.menu} title={objetivos.submenu} image={objetivos.image} />
      <article className="prose-evhsa mx-auto max-w-4xl px-4 py-10 lg:px-6">
        <p>{objetivos.intro}</p>
        <ul>{objetivos.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </article>
    </>
  );
}
