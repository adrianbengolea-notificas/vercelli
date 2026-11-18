import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { elServicio } from "@/data/institutional";
import { serviceLinesOriginal } from "@/data/lines";

export const metadata = { title: "El servicio" };

export default function ElServicioPage() {
  return (
    <>
      <PageHero eyebrow={elServicio.menu} title={elServicio.submenu} image={elServicio.image} />
      <article className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <p className="mb-6 text-lg text-evhsa-muted">{elServicio.intro}</p>
            <ul className="space-y-3">
              {serviceLinesOriginal.map((line) => (
                <li key={line.title} className="rounded-2xl border border-evhsa-line bg-white p-4">
                  <strong>{line.title}</strong>: {line.text}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm">
              El selector de horarios también publica los códigos 523, 1342, 2342, 3342, 4342 y 500R. Se conservan para no perder líneas vigentes del sistema original.
            </p>
            <Link href="/horarios" className="mt-4 inline-block font-semibold text-evhsa-red">Consultar horarios</Link>
          </div>
          <Image src={elServicio.photo.src} alt={elServicio.photo.alt} width={280} height={360} className="rounded-evhsa border" />
        </div>
      </article>
    </>
  );
}
