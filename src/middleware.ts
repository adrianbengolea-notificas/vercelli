import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const map: Record<string, string> = {
  "/empresa/quienessomos": "/empresa/quienes-somos",
  "/empresa/servicios": "/empresa/el-servicio",
  "/objetosperdidos": "/atencion/objetos-perdidos",
  "/preguntasfrecuentes/faqs": "/atencion/preguntas-frecuentes",
  "/preguntasfrecuentes": "/atencion/preguntas-frecuentes",
  "/curriculum/cargarcv": "/rrhh/cargar-cv",
  "/curriculum": "/rrhh",
  "/fotos/galeria": "/galeria",
  "/novedades/lista": "/novedades",
  "/recorrido": "/recorridos",
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const lower = url.pathname.toLowerCase();
  const mapped = map[lower] ?? (lower !== url.pathname ? lower : null);

  if (mapped && mapped !== url.pathname) {
    const next = url.clone();
    next.pathname = mapped;
    return NextResponse.redirect(next, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|original/|images/|api/).*)"],
};
