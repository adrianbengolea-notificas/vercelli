import { PageHero } from "@/components/layout/PageHero";
import { JobForm } from "@/components/forms/JobForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cargar Curriculum Vitae" };

export default function CargarCvPage() {
  return (
    <div>
      <PageHero
        kicker="CURRICULUM VITAE"
        title="Estamos en constante búsqueda de nuevos valores para nuestra empresa."
        description="Complete el formulario con los datos personales y laborales y nos pondremos en contacto con usted ni bien tengamos la necesidad."
        image="/original/header/hdr_ccv.jpg"
      />
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
        <JobForm />
      </div>
    </div>
  );
}
