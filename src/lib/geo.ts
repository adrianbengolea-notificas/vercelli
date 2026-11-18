type GeoRecord = Record<string, unknown>;

function nestedParada(item: GeoRecord) {
  return item.parada && typeof item.parada === "object" ? (item.parada as GeoRecord) : null;
}

function num(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function flattenOfficialStop(item: unknown) {
  if (!item || typeof item !== "object") return null;
  const rec = item as GeoRecord;
  const src = nestedParada(rec) ?? rec;
  const lat = num(src.latitud ?? src.latitude ?? src.lat);
  const lng = num(src.longitud ?? src.longitude ?? src.lng);
  const descripcion = String(src.descripcion ?? src.nombre ?? src.desc ?? rec.descripcion ?? rec.nombre ?? "Parada");
  return {
    ...rec,
    latitud: lat,
    longitud: lng,
    latitude: lat,
    longitude: lng,
    descripcion,
    codigo: src.codigo ?? rec.codigo,
    sentido: rec.sentido,
    orden: rec.orden,
  };
}

export function extractGeoPoint(item: unknown): { lat: number; lng: number; label?: string } | null {
  const flat = flattenOfficialStop(item);
  if (flat?.latitud == null || flat.longitud == null) return null;
  return {
    lat: Number(flat.latitud),
    lng: Number(flat.longitud),
    label: String(flat.descripcion ?? "").trim() || undefined,
  };
}
