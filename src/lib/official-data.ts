import { scheduleLines } from "@/lib/site";
import snapshotsFile from "@/data/schedule-snapshots.json";
import linesFile from "@/data/lineas-ramales.json";
import { flattenOfficialStop } from "@/lib/geo";

export type ScheduleStop = {
  id: number;
  codigo: string;
  cab1: string;
  cab1_hora: string;
  cabeceraTxt: string;
  horaTxt: string;
};

export type ScheduleResponse = {
  line: string;
  date: string;
  source: "live-original" | "snapshot" | "empty";
  sourceUrl: string;
  importedAt?: string;
  data: ScheduleStop[][];
  rows: number | null;
  warning?: string;
};

type SnapshotFile = {
  source: string;
  note: string;
  snapshots: Record<
    string,
    {
      line: string;
      date: string;
      source: string;
      importedAt: string;
      data: ScheduleStop[][];
      rows: number | null;
    }
  >;
};

const snapshots = snapshotsFile as SnapshotFile;

const originalSite = process.env.ORIGINAL_SITE_URL ?? "https://www.e-evhsa.com.ar";
const gpsUrl = process.env.GPS_EVHSA_URL ?? "https://gpsevhsa.com";

export function listOfficialLines() {
  return scheduleLines.slice();
}

export function getSnapshot(line: string, date: string): ScheduleResponse | null {
  const hit = snapshots.snapshots[`${line}|${date}`];
  if (!hit) return null;
  return {
    line,
    date,
    source: "snapshot",
    sourceUrl: hit.source,
    importedAt: hit.importedAt,
    data: hit.data ?? [],
    rows: hit.rows,
  };
}

export async function getOfficialSchedule(line: string, date: string): Promise<ScheduleResponse> {
  try {
    const res = await fetch(`${originalSite}/Horarios/Filtro`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `fecha=${encodeURIComponent(date)}&nroLinea=${encodeURIComponent(line)}`,
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const json = (await res.json()) as { data?: ScheduleStop[][]; rows?: number | null };
      return {
        line,
        date,
        source: "live-original",
        sourceUrl: `${originalSite}/Horarios/Filtro`,
        data: json.data ?? [],
        rows: json.rows ?? 0,
      };
    }
  } catch {
    // Fallback to imported snapshot. Never invent times.
  }

  const snapshot = getSnapshot(line, date);
  if (snapshot) {
    return {
      ...snapshot,
      warning:
        "No fue posible consultar el sistema original en este momento. Se muestra un snapshot oficial importado.",
    };
  }

  return {
    line,
    date,
    source: "empty",
    sourceUrl: `${originalSite}/Horarios/Filtro`,
    data: [],
    rows: 0,
    warning:
      "No hay horarios publicados para esta línea y fecha en la fuente oficial. No se estiman ni inventan horarios.",
  };
}

export type GpsLine = {
  _id: string;
  ramales: string[];
  ramalesComp?: Array<{
    _id: string;
    descripcion: string;
    linea: string;
    activa: boolean;
    id_mysql?: number;
  }>;
};

export async function getGpsLines(): Promise<GpsLine[]> {
  try {
    const res = await fetch(`${gpsUrl}/getLineasRamalesSnyProvi`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = (await res.json()) as { data?: GpsLine[] };
      return json.data ?? [];
    }
  } catch {
    // local snapshot
  }
  return (linesFile as { data?: GpsLine[] }).data ?? [];
}

export async function getStopsByRamal(idRamal: string, sentido: "ida" | "vuelta") {
  try {
    const res = await fetch(`${gpsUrl}/paradasbysentidoramal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sentido, id_ramal: idRamal }),
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = (await res.json()) as { data?: unknown[] };
      return (json.data ?? [])
        .map(flattenOfficialStop)
        .filter((item): item is NonNullable<typeof item> => Boolean(item));
    }
  } catch {
    return [];
  }
  return [];
}

async function mysqlRamalId(idRamal: string) {
  if (/^\d+$/.test(idRamal)) return idRamal;
  const live = await getGpsLines();
  const snapshot = (linesFile as { data?: GpsLine[] }).data ?? [];
  for (const lines of [live, snapshot]) {
    for (const line of lines) {
      const hit = line.ramalesComp?.find((ramal) => ramal._id === idRamal);
      if (hit?.id_mysql) return String(hit.id_mysql);
    }
  }
  return null;
}

export async function getRouteByRamal(idRamal: string) {
  const mysqlId = await mysqlRamalId(idRamal);
  if (!mysqlId) return [];
  try {
    const res = await fetch(`${originalSite}/Recorridos/getRecorridosToWeb/${mysqlId}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) return res.json();
  } catch {
    return [];
  }
  return [];
}

export function displayLineLabel(id: string) {
  if (id.includes("1342")) return "342 A";
  if (id.includes("2342")) return "342 B";
  if (id.includes("3342")) return "342 C";
  return id;
}
