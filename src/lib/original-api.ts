import type { LineRamales, ScheduleGroup, ScheduleResponse, StopItem } from "@/lib/types";
import { dayTypeFromIso, isoToDisplay, weekdayLabel } from "@/lib/utils";
import importedSchedules from "@/data/imported-schedules.json";
import ramalesJson from "@/data/lineas-ramales.json";

const ORIGINAL = process.env.ORIGINAL_SITE_URL ?? "https://www.e-evhsa.com.ar";
const GPS = process.env.GPS_EVHSA_URL ?? "https://gpsevhsa.com";
const SNAPSHOT_UPDATED_AT = "2026-11-18";

const SNAPSHOT_DATES = {
  weekday: "18/11/2026",
  saturday: "21/11/2026",
  sunday: "22/11/2026",
} as const;

type SnapshotFile = Record<
  string,
  Record<string, { data?: ScheduleGroup[]; rows?: number | null }>
>;

function snapshotFor(nroLinea: string, fechaISO: string): ScheduleResponse {
  const dayType = dayTypeFromIso(fechaISO);
  const key = SNAPSHOT_DATES[dayType];
  const file = importedSchedules as SnapshotFile;
  const entry = file[nroLinea]?.[key];
  const data = Array.isArray(entry?.data) ? entry.data : [];
  return {
    data,
    rows: entry?.rows ?? null,
    source: "snapshot",
    sourceLabel: "Copia oficial importada del sitio e-evhsa.com.ar",
    updatedAt: SNAPSHOT_UPDATED_AT,
    empty: data.length === 0,
    nroLinea,
    fecha: isoToDisplay(fechaISO),
    dayLabel: weekdayLabel(fechaISO),
  };
}

export async function fetchOfficialSchedules(
  nroLinea: string,
  fechaISO: string,
): Promise<ScheduleResponse> {
  const fecha = isoToDisplay(fechaISO);
  try {
    const body = new URLSearchParams({ fecha, nroLinea });
    const res = await fetch(`${ORIGINAL}/Horarios/Filtro`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body,
      cache: "no-store",
    });
    if (res.ok) {
      const json = (await res.json()) as { data?: ScheduleGroup[]; rows?: number | null };
      const data = Array.isArray(json.data) ? json.data : [];
      if (data.length > 0) {
        return {
          data,
          rows: json.rows ?? null,
          source: "live",
          sourceLabel: "Consulta en vivo al sistema oficial de EVHSA",
          updatedAt: new Date().toISOString(),
          empty: false,
          nroLinea,
          fecha,
          dayLabel: weekdayLabel(fechaISO),
        };
      }
      const snap = snapshotFor(nroLinea, fechaISO);
      if (!snap.empty) return snap;
      return {
        data: [],
        rows: null,
        source: "live",
        sourceLabel: "Consulta en vivo al sistema oficial de EVHSA",
        updatedAt: new Date().toISOString(),
        empty: true,
        nroLinea,
        fecha,
        dayLabel: weekdayLabel(fechaISO),
      };
    }
  } catch {
    // fallback below
  }
  return snapshotFor(nroLinea, fechaISO);
}

export function getLineRamales(): LineRamales[] {
  const payload = ramalesJson as { data?: LineRamales[] };
  return payload.data ?? [];
}

export async function fetchRamalesLive(): Promise<LineRamales[]> {
  try {
    const res = await fetch(`${GPS}/getLineasRamalesSnyProvi`, { cache: "no-store" });
    if (!res.ok) return getLineRamales();
    const json = (await res.json()) as { data?: LineRamales[] };
    return json.data?.length ? json.data : getLineRamales();
  } catch {
    return getLineRamales();
  }
}

export async function fetchRoutePath(idRamal: string) {
  const res = await fetch(`${ORIGINAL}/Recorridos/getRecorridosToWeb/${encodeURIComponent(idRamal)}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("No se pudo obtener el trazado oficial del ramal.");
  }
  return res.json();
}

export async function fetchStops(idRamal: string, sentido: "ida" | "vuelta"): Promise<StopItem[]> {
  const body = new URLSearchParams({ id_ramal: idRamal, sentido });
  const res = await fetch(`${GPS}/paradasbysentidoramal`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body,
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = (await res.json()) as { data?: StopItem[] };
  return json.data ?? [];
}
