import type { MetadataRoute } from "next";
import { institutionalPages } from "@/content/institutional";
import { news } from "@/content/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.e-evhsa.com.ar";
  const staticRoutes = [
    "",
    "/empresa",
    "/horarios",
    "/recorridos",
    "/paradas",
    "/atencion",
    "/atencion/objetos-perdidos",
    "/atencion/reclamos",
    "/atencion/preguntas-frecuentes",
    "/rrhh",
    "/rrhh/cargar-cv",
    "/contacto",
    "/galeria",
    "/novedades",
    "/privacidad",
  ];
  return [
    ...staticRoutes.map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.7 })),
    ...institutionalPages.map((page) => ({ url: `${base}/empresa/${page.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...news.map((item) => ({ url: `${base}/novedades/${item.slug}`, changeFrequency: "yearly" as const, priority: 0.4 })),
  ];
}
