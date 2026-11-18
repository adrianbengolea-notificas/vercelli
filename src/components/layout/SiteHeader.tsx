"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { extraNav, mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-evhsa-line bg-white/95 backdrop-blur">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="EVHSA, inicio">
          <Image src="/logo.png" alt="EVHSA Empresa Vercelli Hnos S.A." width={181} height={64} priority className="h-12 w-auto md:h-14" />
        </Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Principal">
          {mainNav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-semibold uppercase tracking-wide transition",
                    active ? "bg-evhsa-red text-white" : "text-evhsa-ink hover:bg-evhsa-sand",
                  )}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <div key={item.href} className="relative" onMouseLeave={() => setOpenMenu(null)}>
                <button
                  type="button"
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-semibold uppercase tracking-wide transition",
                    active ? "bg-evhsa-red text-white" : "text-evhsa-ink hover:bg-evhsa-sand",
                  )}
                  aria-expanded={openMenu === item.href}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(openMenu === item.href ? null : item.href)}
                  onMouseEnter={() => setOpenMenu(item.href)}
                >
                  {item.label}
                </button>
                {openMenu === item.href ? (
                  <div className="absolute left-0 top-full z-20 min-w-64 rounded-2xl border border-evhsa-line bg-white p-2 shadow-card">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2 text-sm text-evhsa-ink hover:bg-evhsa-sand"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-evhsa-line xl:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span className={cn("h-0.5 w-5 bg-evhsa-ink transition", open && "translate-y-2 rotate-45")} />
            <span className={cn("h-0.5 w-5 bg-evhsa-ink transition", open && "opacity-0")} />
            <span className={cn("h-0.5 w-5 bg-evhsa-ink transition", open && "-translate-y-2 -rotate-45")} />
          </span>
        </button>
      </div>
      {open ? (
        <div id={menuId} className="border-t border-evhsa-line bg-white xl:hidden">
          <nav className="mx-auto flex max-h-[80vh] max-w-7xl flex-col overflow-y-auto px-4 py-4" aria-label="Móvil">
            {mainNav.map((item) => (
              <div key={item.href} className="border-b border-evhsa-line py-2">
                <Link href={item.href} className="block py-2 text-base font-semibold uppercase">
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link key={child.href} href={child.href} className="block py-2 pl-3 text-evhsa-muted">
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            {extraNav.map((item) => (
              <Link key={item.href} href={item.href} className="py-3 font-semibold uppercase">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
