import { PageHero } from "@/components/ui/PageHero";
import { antecedentes } from "@/data/institutional";

export const metadata = { title: "Antecedentes sociales y laborales" };

export default function AntecedentesPage() {
  return (
    <>
      <PageHero eyebrow={antecedentes.menu} title={antecedentes.submenu} image={antecedentes.image} />
      <article className="prose-evhsa mx-auto max-w-4xl px-4 py-10 lg:px-6">
        {antecedentes.paragraphs.map((p) => <p key={p}>{p}</p>)}
      </article>
    </>
  );
}
