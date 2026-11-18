import { FaqList } from "@/components/faqs/FaqList";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = { title: "Preguntas frecuentes" };

export default function FaqsPage() {
  return (
    <>
      <PageHero eyebrow="PREGUNTAS FRECUENTES" title="Preguntas frecuentes" />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <FaqList />
      </div>
    </>
  );
}
