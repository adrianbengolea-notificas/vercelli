"use client";

import { useState } from "react";
import { contactDestinations } from "@/content/forms";
import { PrivacyNote } from "@/components/forms/PrivacyNote";

export function ContactForm({ defaultDestino = "CONSULTA" }: { defaultDestino?: string }) {
  const [status, setStatus] = useState<{ ok?: boolean; id?: string; error?: string; message?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const res = await fetch("/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setStatus(json);
    setLoading(false);
    if (json.ok) event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-evhsa bg-white p-6 shadow-card">
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">Destino</span>
        <select name="Destino" defaultValue={defaultDestino} className="w-full rounded-xl" required>
          <option value="">Elija a quien dirigir el mensaje</option>
          {contactDestinations.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">Asunto</span>
        <input name="Asunto" className="w-full rounded-xl" required />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="mb-1 block text-sm font-semibold">Nombre</span>
          <input name="Nombre" className="w-full rounded-xl" required />
        </label>
        <label>
          <span className="mb-1 block text-sm font-semibold">Apellido</span>
          <input name="Apellido" className="w-full rounded-xl" required />
        </label>
        <label>
          <span className="mb-1 block text-sm font-semibold">E-mail</span>
          <input type="email" name="Email" className="w-full rounded-xl" required />
        </label>
        <label>
          <span className="mb-1 block text-sm font-semibold">Teléfono</span>
          <input name="Telefono" className="w-full rounded-xl" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">Mensaje</span>
        <textarea name="Mensaje" rows={6} className="w-full rounded-xl" required />
      </label>
      <PrivacyNote />
      <div className="flex gap-3">
        <button className="rounded-full bg-evhsa-green px-5 py-3 font-semibold text-white" disabled={loading} type="submit">
          {loading ? "Enviando…" : "enviar"}
        </button>
        <button className="rounded-full border px-5 py-3" type="reset">borrar</button>
      </div>
      {status?.ok ? <p className="rounded-xl bg-emerald-50 p-3 text-sm">Solicitud {status.id}. {status.message}</p> : null}
      {status?.error ? <p className="text-sm text-evhsa-red">{status.error}</p> : null}
    </form>
  );
}
