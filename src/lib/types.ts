export type DayType = "weekday" | "saturday" | "sunday";

export type ScheduleStop = {
  id: number;
  codigo: string;
  cab1: string;
  cab1_hora: string;
  cabeceraTxt: string;
  horaTxt: string;
};

export type ScheduleGroup = ScheduleStop[];

export type ScheduleResponse = {
  data: ScheduleGroup[];
  rows: number | null;
  source: "live" | "snapshot";
  sourceLabel: string;
  updatedAt: string;
  empty: boolean;
  nroLinea: string;
  fecha: string;
  dayLabel: string;
};

export type RoutePoint = {
  latitud: string;
  longitud: string;
  orden: number;
  descripcion?: string;
  tipo?: string;
};

export type StopItem = {
  _id: string;
  sentido: string;
  orden: number;
  lineatxt?: string;
  parada: {
    _id: string;
    latitude: string;
    longitude: string;
    descripcion: string;
    codigo?: string;
  };
};

export type Ramal = {
  _id: string;
  descripcion: string;
  linea: string;
  activa?: boolean;
};

export type LineRamales = {
  _id: string;
  ida: string | null;
  vuelta: string | null;
  ramales: string[];
  ramalesComp: Ramal[];
};
