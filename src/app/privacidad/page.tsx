import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacidad y datos personales" };

export default function PrivacidadPage() {
  return (
    <div>
      <PageHero kicker="PRIVACIDAD" title="Tratamiento de datos personales" description="Información conforme a la Ley 25.326 de Protección de los Datos Personales." />
      <article className="prose-evhsa mx-auto max-w-3xl px-4 py-10 lg:px-6">
        <p>El responsable del tratamiento es {site.legalName}, {site.address}, {site.email}.</p>
        <p>Los formularios recaban únicamente los datos necesarios para:</p>
        <ul>
          <li>Consultas, reclamos y sugerencias.</li>
          <li>Búsqueda de objetos perdidos.</li>
          <li>Recepción de postulaciones laborales.</li>
          <li>Administración interna de contenidos y horarios.</li>
        </ul>
        <p>No se recaban datos innecesarios. Los CVs y archivos se almacenan fuera de un bucket público. El acceso queda restringido a personal autorizado de RRHH y administración.</p>
        <p>Retención prevista: consultas y reclamos, 24 meses; objetos perdidos, 12 meses; postulaciones, 12 meses salvo que el proceso de selección continúe. Los titulares pueden solicitar acceso, rectificación o supresión a {site.email}.</p>
        <p>La Dirección Nacional de Protección de Datos Personales, órgano de control de la Ley 25.326, tiene la atribución de atender denuncias y reclamos.</p>
      </article>
    </div>
  );
}
