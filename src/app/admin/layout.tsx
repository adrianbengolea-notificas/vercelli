import Link from "next/link";
import { cookies } from "next/headers";
import { LogoutButton } from "@/components/admin/LogoutButton";

const links = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/horarios", label: "Horarios" },
  { href: "/admin/lineas", label: "Líneas y recorridos" },
  { href: "/admin/paradas", label: "Paradas" },
  { href: "/admin/novedades", label: "Novedades y avisos" },
  { href: "/admin/contenidos", label: "Textos institucionales" },
  { href: "/admin/faqs", label: "Preguntas frecuentes" },
  { href: "/admin/formularios", label: "Formularios recibidos" },
  { href: "/admin/auditoria", label: "Auditoría" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const authed = jar.get("evhsa_admin")?.value === "1";
  if (!authed) return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-[240px_1fr]">
        <aside className="bg-evhsa-ink p-5 text-white">
          <p className="text-xs uppercase tracking-[0.25em] text-white/60">EVHSA Admin</p>
          <nav className="mt-6 space-y-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="block rounded-xl px-3 py-2 text-sm hover:bg-white/10">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8">
            <LogoutButton />
          </div>
        </aside>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
