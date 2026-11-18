"use client";

import { useMemo, useState } from "react";
import { faqs, faqCategories } from "@/content/faqs";

export function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  const filtered = useMemo(
    () =>
      faqs.filter((faq) => {
        const matchCategory = category === "Todas" || faq.category === category;
        const haystack = `${faq.question} ${faq.answer}`.toLowerCase();
        return matchCategory && haystack.includes(query.toLowerCase());
      }),
    [category, query],
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-[1fr_200px]">
        <input className="rounded-xl" placeholder="Buscar pregunta" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="rounded-xl" value={category} onChange={(e) => setCategory(e.target.value)}>
          {faqCategories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="space-y-3">
        {filtered.map((faq) => {
          const isOpen = open === faq.id;
          return (
            <div key={faq.id} className="rounded-2xl bg-white shadow-card">
              <h2>
                <button
                  className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : faq.id)}
                >
                  {faq.question}
                  <span aria-hidden>{isOpen ? "−" : "+"}</span>
                </button>
              </h2>
              {isOpen ? <div className="whitespace-pre-line px-5 pb-5 text-evhsa-muted">{faq.answer}</div> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
