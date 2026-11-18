import Image from "next/image";
import Link from "next/link";
import { Clock, Map, MapPin, Search, HelpCircle, MessageSquareWarning, Briefcase } from "lucide-react";
import { ScheduleExplorer } from "@/components/schedules/ScheduleExplorer";
import { faqs } from "@/content/faqs";
import { news } from "@/content/news";
import { institutionalPages } from "@/content/institutional";
import { site } from "@/lib/site";
import { OrganizationJsonLd } from "@/app/jsonld";

const shortcuts = [
  { href: "/horarios", label: "Ver horarios", icon: Clock },
  { href: "/recorridos", label: "Consultar recorridos", icon: Map },
  { href: "/paradas", label: "Buscar paradas", icon: MapPin },
  { href: "/atencion/objetos-perdidos", label: "Objetos perdidos", icon: Search },
  { href: "/atencion/reclamos", label: "Reclamos y sugerencias", icon: MessageSquareWarning },
];

export default function HomePage() {
  const servicio = institutionalPages.find((page) => page.slug === "el-servicio")!;

  return (
    <div>
      <OrganizationJsonLd />
      <section className="relative min-h-[78vh] overflow-hidden bg-evhsa-ink text-white">
        <Image src="/original/slides/foto.jpg" alt="Unidad EVHSA" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-evhsa-red/35" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-6 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/75">{site.legalName}</p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">EVHSA | Conectamos personas, acercamos destinos</h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              Transporte público urbano y provincial en San Nicolás, San Pedro, Ramallo, Pergamino y la región.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {shortcuts.map((item) => (
                <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur hover:bg-white/20">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-evhsa bg-white p-5 text-evhsa-ink shadow-lift">
            <h2 className="text-xl font-semibold">Encontrá tu colectivo</h2>
            <p className="mt-1 text-sm text-evhsa-muted">Consulta de horarios programados oficiales por línea y fecha.</p>
            <div className="mt-4">
              <ScheduleExplorer />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-evhsa-red">Avisos</p>
            <h2 className="mt-2 font-display text-3xl">Avisos y modificaciones del servicio</h2>
          </div>
          <Link href="/novedades" className="text-sm font-semibold text-evhsa-red">Ver todas</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {news.map((item) => (
            <article key={item.id} className="rounded-evhsa bg-white p-6 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-widest text-evhsa-red">{item.date}</p>
              <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-evhsa-muted">{item.brief}</p>
              <Link href={`/novedades/${item.slug}`} className="mt-4 inline-block font-semibold text-evhsa-green">
                Ver nota
              </Link>
            </article>
          ))}
          <article className="rounded-evhsa border border-dashed border-evhsa-line bg-white p-6">
            <h3 className="text-xl font-semibold">Redes oficiales</h3>
            <p className="mt-2 text-sm text-evhsa-muted">
              Facebook e Instagram publicados por EVHSA para novedades de servicio.
            </p>
            <div className="mt-4 flex gap-4">
              <a className="underline" href={site.social.facebook}>Facebook</a>
              <a className="underline" href={site.social.instagram}>Instagram</a>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-2 lg:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-evhsa-red">Mapas</p>
            <h2 className="mt-2 font-display text-3xl">Recorridos y paradas</h2>
            <p className="mt-4 text-evhsa-muted">
              Consultá recorridos y listas de paradas a partir de las mismas fuentes oficiales utilizadas por el sitio original.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/recorridos" className="rounded-full bg-evhsa-red px-5 py-3 font-semibold text-white">Ver recorridos</Link>
              <Link href="/paradas" className="rounded-full border border-evhsa-line px-5 py-3 font-semibold">Ver paradas</Link>
            </div>
          </div>
          <Image src="/original/fotos/7000efe4-2a6d-4cc7-9cc6-15a21750a4ef.jpg" alt="Unidades 0Km EVHSA" width={1200} height={800} className="h-72 w-full rounded-evhsa object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-evhsa-red">Empresa</p>
        <h2 className="mt-2 font-display text-3xl">Presentación institucional de EVHSA</h2>
        <p className="mt-4 max-w-3xl text-evhsa-muted">
          Empresa Vercelli Hnos. S.A. es una sociedad anónima constituida desde el año 1969 y dedicada al transporte de corta, media y larga distancia, turismo y transporte de personal a fábrica.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {institutionalPages.slice(0, 6).map((page) => (
            <Link key={page.slug} href={`/empresa/${page.slug}`} className="rounded-evhsa bg-white p-5 shadow-card hover:shadow-lift">
              <p className="text-xs uppercase tracking-widest text-evhsa-red">{page.kicker}</p>
              <h3 className="mt-2 text-xl font-semibold">{page.heading}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
          <h2 className="font-display text-3xl">Servicios de la empresa</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {servicio.lists?.[0].items.map((item) => (
              <li key={item} className="rounded-2xl border border-evhsa-line px-4 py-3 text-sm text-evhsa-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-3xl">Preguntas frecuentes</h2>
          <Link href="/atencion/preguntas-frecuentes" className="font-semibold text-evhsa-red">Ver todas</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.slice(0, 4).map((faq) => (
            <article key={faq.id} className="rounded-evhsa bg-white p-5 shadow-card">
              <HelpCircle className="h-5 w-5 text-evhsa-green" />
              <h3 className="mt-3 font-semibold">{faq.question}</h3>
              <p className="mt-2 line-clamp-4 whitespace-pre-line text-sm text-evhsa-muted">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-evhsa-red text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-2 lg:px-6">
          <div>
            <h2 className="font-display text-3xl">Contacto</h2>
            <p className="mt-3 text-white/85">{site.address}</p>
            <p className="mt-2">Línea telefónica {site.phoneMain}. Por horarios y servicios {site.phoneSchedules}.</p>
            <p className="mt-2">{site.email}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contacto" className="rounded-full bg-white px-5 py-3 font-semibold text-evhsa-red">Realice su consulta</Link>
              <Link href="/rrhh/cargar-cv" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 font-semibold">
                <Briefcase className="h-4 w-4" /> RRHH
              </Link>
            </div>
          </div>
          <div className="rounded-evhsa bg-white/10 p-6">
            <h3 className="font-semibold">Oficinas de atención</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              {site.offices.map((office) => (
                <li key={office.name}>
                  <strong>{office.name}.</strong> {office.detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
