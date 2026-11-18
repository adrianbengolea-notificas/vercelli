import Link from "next/link";
import { extraNav, mainNav } from "@/lib/navigation";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-evhsa-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <p className="font-display text-xl font-semibold text-evhsa-red">{site.legalName}</p>
          <p className="mt-3 text-sm leading-6 text-evhsa-muted">{site.address}</p>
          <p className="mt-3 text-sm leading-6">
            Línea telefónica <a className="font-semibold text-evhsa-red" href={`tel:4449400`}>{site.phoneMain}</a>.
            Por horarios y servicios <a className="font-semibold text-evhsa-red" href={`tel:4449450`}>{site.phoneSchedules}</a>.
          </p>
          <p className="mt-2 text-sm">
            Mail: <a className="font-semibold text-evhsa-green" href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide">Secciones</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-evhsa-red">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide">Servicios al pasajero</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/horarios" className="hover:text-evhsa-red">Horarios</Link></li>
            <li><Link href="/recorridos" className="hover:text-evhsa-red">Recorridos</Link></li>
            <li><Link href="/paradas" className="hover:text-evhsa-red">Paradas</Link></li>
            <li><Link href="/atencion/objetos-perdidos" className="hover:text-evhsa-red">Objetos perdidos</Link></li>
            <li><Link href="/atencion/reclamos" className="hover:text-evhsa-red">Reclamos y sugerencias</Link></li>
            <li><Link href="/atencion/preguntas-frecuentes" className="hover:text-evhsa-red">Preguntas frecuentes</Link></li>
            {extraNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-evhsa-red">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide">Redes oficiales</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={site.social.facebook} className="hover:text-evhsa-red" rel="noreferrer" target="_blank">
                Facebook
              </a>
            </li>
            <li>
              <a href={site.social.instagram} className="hover:text-evhsa-red" rel="noreferrer" target="_blank">
                Instagram
              </a>
            </li>
          </ul>
          <ul className="mt-6 space-y-2 text-sm">
            <li><Link href="/privacidad" className="hover:text-evhsa-red">Privacidad y protección de datos</Link></li>
            <li><Link href="/admin" className="hover:text-evhsa-red">Acceso administración</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
