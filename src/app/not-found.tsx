import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Página no encontrada</h1>
      <p className="mt-4 text-evhsa-muted">El contenido puede haber cambiado de URL. Conservamos redirecciones 301 de las rutas originales.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-evhsa-red px-5 py-3 font-semibold text-white">
        Volver al inicio
      </Link>
    </div>
  );
}
