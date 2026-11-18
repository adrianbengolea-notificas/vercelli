import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const copy: Record<string, { title: string; body: string }> = {
  lineas: {
    title: "Líneas y recorridos",
    body: "Las líneas vigentes se leen desde gpsevhsa.com/getLineasRamalesSnyProvi. La edición en Firebase cubre altas, bajas y versiones de ramales. No se inventan trazados.",
  },
  paradas: {
    title: "Paradas",
    body: "Las paradas oficiales se consultan en gpsevhsa.com/paradasbysentidoramal. El alta manual exige coordenadas verificadas.",
  },
  novedades: {
    title: "Novedades y avisos",
    body: "Permite publicar novedades y avisos de modificación de servicio, con vigencia, vista previa y registro de auditoría.",
  },
  contenidos: {
    title: "Textos institucionales",
    body: "Los textos actuales fueron migrados desde el sitio original. Cualquier edición queda versionada para poder restaurar.",
  },
  faqs: {
    title: "Preguntas frecuentes",
    body: "Las 7 preguntas originales están publicadas. El panel permite agregar categorías sin borrar las vigentes.",
  },
  auditoria: {
    title: "Auditoría administrativa",
    body: "Colección auditLogs: usuario, fecha, acción, entidad, valor anterior y valor nuevo. Restauración de versiones anteriores cuando Firebase está activo.",
  },
};

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const jar = await cookies();
  if (jar.get("evhsa_admin")?.value !== "1") redirect("/admin/login");
  const { section } = await params;
  const item = copy[section];
  if (!item) redirect("/admin");
  return (
    <div>
      <h1 className="font-display text-3xl">{item.title}</h1>
      <p className="mt-4 max-w-3xl text-evhsa-muted">{item.body}</p>
    </div>
  );
}
