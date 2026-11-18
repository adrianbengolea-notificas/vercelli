"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { displayLineLabel, type GpsLine } from "@/lib/official-data";
import { extractGeoPoint } from "@/lib/geo";

const MapCanvas = dynamic(() => import("./MapCanvas").then((m) => m.MapCanvas), { ssr: false });

export function RouteExplorer() {
  const [lines, setLines] = useState<GpsLine[]>([]);
  const [lineId, setLineId] = useState("");
  const [ramalId, setRamalId] = useState("");
  const [points, setPoints] = useState<Array<{ lat: number; lng: number; label?: string }>>([]);
  const [polyline, setPolyline] = useState<Array<{ lat: number; lng: number; label?: string }>>([]);
  const [message, setMessage] = useState("Seleccione línea y ramal. No se inventan trazados.");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void fetch("/api/lineas")
      .then((r) => r.json())
      .then((json) => setLines(json.data ?? []));
  }, []);

  const selected = lines.find((line) => line._id === lineId);
  const ramales = useMemo(() => selected?.ramalesComp ?? [], [selected]);

  async function load() {
    if (!ramalId) {
      setMessage("Debe seleccionar Linea, Ramal y Sentido");
      return;
    }
    setLoading(true);
    const [routeRes, idaRes, vueltaRes] = await Promise.all([
      fetch(`/api/recorridos?ramal=${ramalId}`),
      fetch(`/api/paradas?ramal=${ramalId}&sentido=ida`),
      fetch(`/api/paradas?ramal=${ramalId}&sentido=vuelta`),
    ]);
    const routeJson = await routeRes.json();
    const ida = (await idaRes.json()).data ?? [];
    const vuelta = (await vueltaRes.json()).data ?? [];
    const fromStops = [...ida, ...vuelta].map(extractGeoPoint).filter(Boolean) as Array<{ lat: number; lng: number; label?: string }>;
    const fromRoute = Array.isArray(routeJson.data)
      ? (routeJson.data as unknown[]).map(extractGeoPoint).filter(Boolean) as Array<{ lat: number; lng: number; label?: string }>
      : [];
    setPolyline(fromRoute);
    setPoints(fromStops);
    setMessage(
      fromRoute.length || fromStops.length
        ? `Recorrido oficial del ramal seleccionado. ${fromRoute.length || fromStops.length} puntos geográficos verificados.`
        : "La fuente oficial no devolvió coordenadas para este ramal. Queda pendiente de importación, sin trazado inventado.",
    );
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <form
        className="grid gap-3 rounded-evhsa bg-white p-4 shadow-card md:grid-cols-3"
        onSubmit={(e) => {
          e.preventDefault();
          void load();
        }}
      >
        <label>
          <span className="mb-1 block text-sm font-semibold">Línea</span>
          <select className="w-full rounded-xl" value={lineId} onChange={(e) => { setLineId(e.target.value); setRamalId(""); }}>
            <option value="">Seleccione..</option>
            {lines.map((line) => (
              <option key={line._id} value={line._id}>{displayLineLabel(line._id)}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-1 block text-sm font-semibold">Ramal</span>
          <select className="w-full rounded-xl" value={ramalId} onChange={(e) => setRamalId(e.target.value)}>
            <option value="">Seleccione..</option>
            {ramales.map((ramal) => (
              <option key={ramal._id} value={ramal._id}>{ramal.descripcion}</option>
            ))}
          </select>
        </label>
        <div className="flex items-end">
          <button className="w-full rounded-full bg-evhsa-green px-4 py-3 font-semibold text-white" type="submit">Ver</button>
        </div>
      </form>
      <p className="text-sm text-evhsa-muted">{loading ? "Consultando fuente oficial…" : message}</p>
      {points.length ? (
        <ol className="grid max-h-48 gap-1 overflow-auto rounded-2xl bg-white p-4 text-sm md:grid-cols-2">
          {points.slice(0, 80).map((point, index) => (
            <li key={`${point.lat}-${point.lng}-${index}`}>{point.label ?? `Punto ${index + 1}`}</li>
          ))}
        </ol>
      ) : null}
      <MapCanvas polyline={polyline} points={points} />
    </div>
  );
}
