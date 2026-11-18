"use client";

import { useMemo, useState } from "react";
import { faqs } from "@/data/faqs";

export function FaqList() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const value = q.trim().toLowerCase();
    if (!value) return faqs;
    return faqs.filter((item) => `${item.question} ${item.answer} ${item.category}`.toLowerCase().includes(value));
  }, [q]);

  return (
    <>
      <label className="block text-sm font-semibold">
        Buscar
        <input value={q} onChange={(e) => setQ(e.target.value)} className="mt-1 w-full rounded-xl" placeholder="SUBE, Mi Boleto, reclamo..." />
      </label>
      <div className="mt-6 space-y-3">
        {filtered.map((faq) => (
          <details key={faq.id} className="rounded-2xl border bg-white p-4">
            <summary className="cursor-pointer font-semibold">{faq.question}</summary>
            <p className="mt-2 text-xs uppercase text-evhsa-green">{faq.category}</p>
            <p className="mt-3 whitespace-pre-line text-evhsa-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </>
  );
}
