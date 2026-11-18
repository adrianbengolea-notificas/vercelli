import Image from "next/image";
import Link from "next/link";
import { footerNav } from "@/lib/navigation";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-evhsa-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 lg:px-6">
        <div>
          <Image src="/original/logo.png" alt="EVHSA" width={181} height={64} className="h-12 w-auto" />
          <p className="mt-4 text-sm leading-6 text-evhsa-muted">
            {site.legalName}
            <br />
            {site.address}
          </p>
          <p className="mt-3 text-sm text-evhsa-muted">
            Línea telefónica <strong>{site.phoneMain}</strong>.
            <br />
            Por horarios y servicios <strong>{site.phoneSchedules}</strong>.
            <br />
            Mail: <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        {footerNav.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-evhsa-red">{group.title}</h2>
            <ul className="mt-4 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-evhsa-muted hover:text-evhsa-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-evhsa-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-evhsa-muted sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <p>Tratamiento de datos conforme a la Ley 25.326. <Link href="/privacidad" className="underline">Política de privacidad</Link>.</p>
          <p>Modernización del portal original {site.originalUrl}</p>
        </div>
      </div>
    </footer>
  );
}
