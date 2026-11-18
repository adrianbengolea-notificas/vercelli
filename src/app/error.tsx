"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl">No se pudo cargar la página</h1>
      <p className="mt-3 text-evhsa-muted">Intente nuevamente. Si el problema continúa, comuníquese al 4449400.</p>
      <button className="mt-6 rounded-full bg-evhsa-red px-5 py-3 font-semibold text-white" onClick={reset} type="button">
        Reintentar
      </button>
    </div>
  );
}
