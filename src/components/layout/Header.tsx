"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-evhsa-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Inicio EVHSA" onClick={() => setOpen(false)}>
          <Image src="/original/logo.png" alt="EVHSA - Empresa Vercelli Hnos S.A." width={181} height={64} priority className="h-12 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {mainNav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-semibold tracking-wide transition",
                    active ? "bg-evhsa-red text-white" : "text-evhsa-ink hover:bg-evhsa-sand",
                  )}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold tracking-wide transition",
                    active ? "bg-evhsa-red text-white" : "text-evhsa-ink hover:bg-evhsa-sand",
                  )}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </Link>
                <div className="invisible absolute left-0 top-full z-20 min-w-64 translate-y-2 rounded-2xl border border-evhsa-line bg-white p-2 opacity-0 shadow-card transition group-hover:visible group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-1 group-focus-within:opacity-100">
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
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-evhsa-line p-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-evhsa-line bg-white lg:hidden">
          <nav aria-label="Móvil" className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {mainNav.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link href={item.href} className="flex-1 py-3 text-base font-semibold" onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                  {item.children ? (
                    <button
                      type="button"
                      className="rounded-full p-2"
                      aria-expanded={expanded === item.href}
                      onClick={() => setExpanded(expanded === item.href ? null : item.href)}
                    >
                      <span className="sr-only">Submenú {item.label}</span>
                      <ChevronDown className={cn("h-4 w-4 transition", expanded === item.href && "rotate-180")} />
                    </button>
                  ) : null}
                </div>
                {item.children && expanded === item.href ? (
                  <div className="ml-3 space-y-1 border-l border-evhsa-line pl-3">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="block py-2 text-sm text-evhsa-muted" onClick={() => setOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
