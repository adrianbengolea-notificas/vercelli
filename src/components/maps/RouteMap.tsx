"use client";

import { CircleMarker, MapContainer, Polyline, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { RoutePoint } from "@/lib/types";

type Stop = { lat: number; lng: number; label: string };

export default function RouteMap({ points = [], stops = [] }: { points?: RoutePoint[]; stops?: Stop[] }) {
  const latlngs = points
    .map((point) => [Number(point.latitud), Number(point.longitud)] as [number, number])
    .filter(([lat, lng]) => Number.isFinite(lat) && Number.isFinite(lng));
  const center = latlngs[0] ?? (stops[0] ? [stops[0].lat, stops[0].lng] as [number, number] : ([-33.33, -60.22] as [number, number]));

  return (
    <MapContainer center={center} zoom={13} className="h-[480px] w-full overflow-hidden rounded-evhsa" scrollWheelZoom>
      <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {latlngs.length ? <Polyline positions={latlngs} pathOptions={{ color: "#E22815", weight: 5 }} /> : null}
      {stops.map((stop) => (
        <CircleMarker key={`${stop.lat}-${stop.lng}-${stop.label}`} center={[stop.lat, stop.lng]} radius={7} pathOptions={{ color: "#11671B", fillOpacity: 0.9 }}>
          <Popup>{stop.label}</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
