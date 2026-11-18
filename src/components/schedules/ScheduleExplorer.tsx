"use client";

import { useEffect, useMemo, useState } from "react";
import { Printer, Share2, AlertTriangle } from "lucide-react";
import { scheduleLines } from "@/lib/site";
import { currentMinutes, dayTypeLabel, parseTimeToMinutes, todayInputValue, toOfficialDate } from "@/lib/utils";
import type { ScheduleResponse } from "@/lib/official-data";
import { LineBadge } from "@/components/ui/LineBadge";

type Props = {
  initialLine?: string;
  initialDate?: string;
};

export function ScheduleExplorer({ initialLine = "", initialDate }: Props) {
  const [line, setLine] = useState(initialLine);
  const [date, setDate] = useState(initialDate || todayInputValue());
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScheduleResponse | null>(null);
  const [error, setError] = useState("");
  const [consultedAt, setConsultedAt] = useState("");
  const [now, setNow] = useState<number | null>(null);

  const filteredLines = useMemo(
    () => scheduleLines.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  async function load(nextLine = line, nextDate = date) {
    if (!nextLine) {
      setResult(null);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ linea: nextLine, fecha: toOfficialDate(nextDate) });
      const res = await fetch(`/api/horarios?${params.toString()}`);
      const json = (await res.json()) as ScheduleResponse;
      setResult(json);
      setConsultedAt(
        new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" }),
      );
      const url = `/horarios?linea=${encodeURIComponent(nextLine)}&fecha=${encodeURIComponent(nextDate)}`;
      if (window.location.pathname.startsWith("/horarios")) {
        window.history.replaceState(null, "", url);
      }
    } catch {
      setError("No se pudo consultar el horario. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setNow(currentMinutes());
    const timer = window.setInterval(() => setNow(currentMinutes()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (initialLine) void load(initialLine, date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isToday = date === todayInputValue();

  return (
    <div className="space-y-6">
      <form
        className="grid gap-4 rounded-evhsa bg-white p-5 shadow-card xl:grid-cols-[1fr_180px_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          void load();
        }}
      >
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Línea</span>
          <input
            className="mb-2 w-full rounded-xl border-evhsa-line"
            placeholder="Buscar línea"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="w-full rounded-xl border-evhsa-line"
            value={line}
            onChange={(e) => setLine(e.target.value)}
            required
          >
            <option value="">Seleccione..</option>
            {filteredLines.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Fecha</span>
          <input
            type="date"
            className="w-full rounded-xl border-evhsa-line"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <span className="mt-2 block text-xs text-evhsa-muted">{dayTypeLabel(date)}</span>
        </label>
        <div className="flex items-end">
          <button type="submit" className="w-full rounded-full bg-evhsa-green px-5 py-3 font-semibold text-white hover:bg-evhsa-green-dark">
            Consultar horarios
          </button>
        </div>
      </form>

      {loading ? <p className="rounded-2xl bg-white p-6 text-evhsa-muted">Consultando datos oficiales…</p> : null}
      {error ? <p className="rounded-2xl bg-red-50 p-4 text-evhsa-red">{error}</p> : null}

      {result ? (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4">
            <div>
              <div className="flex items-center gap-3">
                <LineBadge line={result.line} />
                <p className="font-semibold">Horarios programados del {result.date}</p>
              </div>
              <p className="mt-1 text-xs text-evhsa-muted">
                Fuente: {result.source === "live-original" ? "sistema original EVHSA en vivo" : result.source === "snapshot" ? "snapshot oficial importado" : "sin publicación"}
                {result.importedAt ? ` · Importado ${result.importedAt}` : ""}
                {consultedAt ? ` · última consulta ${consultedAt}` : ""}
              </p>
            </div>
            <div className="flex gap-2 no-print">
              <button type="button" className="rounded-full border px-4 py-2 text-sm" onClick={() => window.print()}>
                <Printer className="mr-1 inline h-4 w-4" /> Imprimir / PDF
              </button>
              <button
                type="button"
                className="rounded-full border px-4 py-2 text-sm"
                onClick={async () => {
                  const url = window.location.href;
                  if (navigator.share) await navigator.share({ title: `Horarios línea ${result.line}`, url });
                  else await navigator.clipboard.writeText(url);
                }}
              >
                <Share2 className="mr-1 inline h-4 w-4" /> Compartir
              </button>
            </div>
          </div>

          {result.warning ? (
            <p className="flex items-start gap-2 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
              <AlertTriangle className="mt-0.5 h-4 w-4" /> {result.warning}
            </p>
          ) : null}

          {!result.data.length ? (
            <p className="rounded-2xl bg-white p-6">No hay horarios cargados para los filtros seleccionados.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {result.data.map((column) => {
                const heading = column[0]?.cabeceraTxt ?? "Cabecera";
                return (
                  <article key={heading} className="overflow-hidden rounded-2xl border border-evhsa-green-mid bg-white">
                    <h2 className="bg-evhsa-green px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-white">
                      {heading}
                    </h2>
                    <table className="w-full text-center">
                      <tbody>
                        {column.map((row, index) => {
                          const minutes = parseTimeToMinutes(row.horaTxt);
                          const isNext = Boolean(
                            isToday &&
                              now !== null &&
                              minutes !== null &&
                              minutes >= now &&
                              (index === 0 || (parseTimeToMinutes(column[index - 1]?.horaTxt) ?? -1) < now),
                          );
                          return (
                            <tr key={`${row.codigo}-${row.horaTxt}-${index}`} className={isNext ? "bg-emerald-50 font-bold" : ""}>
                              <td className="border-t border-evhsa-green-mid px-3 py-2">
                                {row.horaTxt}
                                {isNext ? <span className="ml-2 text-xs text-evhsa-green">Próximo programado</span> : null}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </article>
                );
              })}
            </div>
          )}
          <p className="text-xs text-evhsa-muted">
            Estos valores son horarios programados de la fuente oficial. No se muestran estimaciones ni datos en tiempo real.
          </p>
        </section>
      ) : null}
    </div>
  );
}
