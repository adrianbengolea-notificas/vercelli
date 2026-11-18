"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { displayLineLabel, type GpsLine } from "@/lib/official-data";
import { extractGeoPoint } from "@/lib/geo";

const MapCanvas = dynamic(() => import("./MapCanvas").then((m) => m.MapCanvas), { ssr: false });

type Stop = Record<string, unknown>;

function labelOf(stop: Stop) {
  return extractGeoPoint(stop)?.label ?? String(stop.descripcion ?? stop.nombre ?? stop.desc ?? stop.calle ?? "Parada");
}

function pointOf(stop: Stop) {
  const point = extractGeoPoint(stop);
  return point ? { ...point, label: point.label ?? labelOf(stop) } : null;
}

export function StopsExplorer() {
  const [lines, setLines] = useState<GpsLine[]>([]);
  const [lineId, setLineId] = useState("");
  const [ida, setIda] = useState<Stop[]>([]);
  const [vuelta, setVuelta] = useState<Stop[]>([]);
  const [user, setUser] = useState<{ lat: number; lng: number } | null>(null);
  const [message, setMessage] = useState("Seleccione una línea para ver paradas oficiales.");

  useEffect(() => {
    void fetch("/api/lineas").then((r) => r.json()).then((json) => setLines(json.data ?? []));
  }, []);

  const selected = lines.find((line) => line._id === lineId);
  const ramales = selected?.ramales ?? [];

  async function load() {
    if (!selected) {
      setMessage("No hay paradas cargados para los filtros seleccionados.");
      return;
    }
    const results = await Promise.all(
      ramales.flatMap((ramal) => [
        fetch(`/api/paradas?ramal=${ramal}&sentido=ida`).then((r) => r.json()),
        fetch(`/api/paradas?ramal=${ramal}&sentido=vuelta`).then((r) => r.json()),
      ]),
    );
    const nextIda: Stop[] = [];
    const nextVuelta: Stop[] = [];
    results.forEach((item, index) => {
      if (index % 2 === 0) nextIda.push(...(item.data ?? []));
      else nextVuelta.push(...(item.data ?? []));
    });
    setIda(nextIda);
    setVuelta(nextVuelta);
    setMessage(!nextIda.length && !nextVuelta.length
      ? "No hay paradas cargados para los filtros seleccionados."
      : "Listado oficial de paradas por sentido.");
  }

  const mapPoints = useMemo(
    () => [...ida, ...vuelta].map(pointOf).filter(Boolean) as Array<{ lat: number; lng: number; label: string }>,
    [ida, vuelta],
  );

  const nearby = useMemo(() => {
    if (!user) return [];
    return mapPoints
      .map((point) => ({
        ...point,
        distance: Math.hypot(point.lat - user.lat, point.lng - user.lng),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 8);
  }, [mapPoints, user]);

  return (
    <div className="space-y-4">
      <form
        className="flex flex-wrap items-end gap-3 rounded-evhsa bg-white p-4 shadow-card"
        onSubmit={(e) => {
          e.preventDefault();
          void load();
        }}
      >
        <label className="min-w-56 flex-1">
          <span className="mb-1 block text-sm font-semibold">Línea</span>
          <select className="w-full rounded-xl" value={lineId} onChange={(e) => setLineId(e.target.value)}>
            <option value="">Seleccione..</option>
            {lines.map((line) => (
              <option key={line._id} value={line._id}>{displayLineLabel(line._id)}</option>
            ))}
          </select>
        </label>
        <button className="rounded-full bg-evhsa-green px-5 py-3 font-semibold text-white" type="submit">Ver Paradas</button>
        <button
          className="rounded-full border px-5 py-3 text-sm"
          type="button"
          onClick={() => {
            if (!navigator.geolocation) return;
            navigator.geolocation.getCurrentPosition(
              (pos) => setUser({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
              () => setMessage("La geolocalización es opcional y no fue autorizada."),
            );
          }}
        >
          Paradas cercanas (opcional)
        </button>
        <button className="rounded-full border px-5 py-3 text-sm" type="button" onClick={() => window.print()}>
          Imprimir
        </button>
      </form>
      <p className="text-sm text-evhsa-muted">{message}</p>
      {nearby.length ? (
        <div className="rounded-2xl bg-emerald-50 p-4 text-sm">
          <strong>Paradas más cercanas a tu ubicación:</strong>
          <ul className="mt-2 grid gap-1 md:grid-cols-2">
            {nearby.map((item) => (
              <li key={`${item.lat}-${item.lng}`}>{item.label}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-auto rounded-2xl bg-white">
          <table className="w-full text-sm">
            <thead className="bg-evhsa-green text-white"><tr><th className="p-3">Ida</th></tr></thead>
            <tbody>
              {ida.map((stop, index) => (
                <tr key={index} className="border-t"><td className="p-2">{labelOf(stop)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="overflow-auto rounded-2xl bg-white">
          <table className="w-full text-sm">
            <thead className="bg-evhsa-green text-white"><tr><th className="p-3">Vuelta</th></tr></thead>
            <tbody>
              {vuelta.map((stop, index) => (
                <tr key={index} className="border-t"><td className="p-2">{labelOf(stop)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <MapCanvas points={mapPoints} userLocation={user} />
    </div>
  );
}
