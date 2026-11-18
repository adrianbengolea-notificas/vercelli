"use client";

import { useState } from "react";
import { lostObjectLines, lostObjectRubros } from "@/content/forms";
import lostObjects from "@/data/lost-objects.json";
import { PrivacyNote } from "@/components/forms/PrivacyNote";

export function LostObjectForm() {
  const [status, setStatus] = useState<{ ok?: boolean; id?: string; error?: string; message?: string } | null>(null);
  const [showList, setShowList] = useState(true);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const res = await fetch("/api/objetos-perdidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setStatus(json);
    if (json.ok) event.currentTarget.reset();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4 rounded-evhsa bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="max-w-2xl text-evhsa-muted">
            Complete el formulario con los datos necesarios para rastrear el objeto extraviado y nos pondremos en contacto con usted a la brevedad.
          </p>
          <button type="button" className="rounded-full bg-evhsa-green px-4 py-2 text-sm font-semibold text-white" onClick={() => setShowList(true)}>
            Ver obj. existentes en la empresa
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-1 block text-sm font-semibold">Fecha</span>
            <input type="date" name="FechaPerdida" className="w-full rounded-xl" required />
          </label>
          <label>
            <span className="mb-1 block text-sm font-semibold">Linea</span>
            <select name="LineaID" className="w-full rounded-xl" required>
              <option value=""></option>
              {lostObjectLines.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-1 block text-sm font-semibold">Rubro</span>
            <select name="RubroID" className="w-full rounded-xl" required>
              <option value=""></option>
              {lostObjectRubros.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-1 block text-sm font-semibold">DNI</span>
            <input name="DNI" className="w-full rounded-xl" required />
          </label>
          <label>
            <span className="mb-1 block text-sm font-semibold">Nombre completo</span>
            <input name="NombreApellido" maxLength={75} className="w-full rounded-xl" required />
          </label>
          <label>
            <span className="mb-1 block text-sm font-semibold">Teléfono</span>
            <input name="Contacto" className="w-full rounded-xl" />
          </label>
          <label>
            <span className="mb-1 block text-sm font-semibold">E-mail</span>
            <input type="email" name="Email" className="w-full rounded-xl" required />
          </label>
        </div>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Descripción</span>
          <textarea name="Descripcion" maxLength={1000} rows={5} className="w-full rounded-xl" required />
        </label>
        <PrivacyNote />
        <div className="flex gap-3">
          <button className="rounded-full bg-evhsa-green px-5 py-3 font-semibold text-white" type="submit">enviar</button>
          <button className="rounded-full border px-5 py-3" type="reset">borrar</button>
        </div>
        {status?.ok ? <p className="rounded-xl bg-emerald-50 p-3 text-sm">Solicitud {status.id}. {status.message}</p> : null}
        {status?.error ? <p className="text-sm text-evhsa-red">{status.error}</p> : null}
      </form>

      {showList ? (
        <section className="rounded-evhsa bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold">Objetos disponibles en Evhsa</h2>
          <p className="mt-2 text-sm text-evhsa-muted">
            Preséntese en nuestras oficinas si encuentra algún objeto extraviado que le pertenzca en el siguiente listado:
          </p>
          <div className="mt-4 overflow-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-evhsa-sand">
                <tr>
                  <th className="p-2">Descripcion</th>
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Encontrado</th>
                </tr>
              </thead>
              <tbody>
                {lostObjects.map((item, index) => (
                  <tr key={`${item.description}-${item.name}-${index}`} className="border-t">
                    <td className="p-2">{item.description}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.found}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-evhsa-muted">Listado migrado del sitio original. No se agregaron ni actualizaron registros.</p>
        </section>
      ) : null}
    </div>
  );
}
