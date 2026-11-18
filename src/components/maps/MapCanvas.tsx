"use client";

import { useEffect } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const stopIcon = new L.DivIcon({
  className: "evhsa-stop",
  html: '<span style="display:block;width:12px;height:12px;border-radius:999px;background:#E22815;border:2px solid white;box-shadow:0 0 0 2px #11671B"></span>',
  iconSize: [12, 12],
});

type Point = { lat: number; lng: number; label?: string };

function Fit({ points }: { points: Point[] }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, points]);
  return null;
}

export function MapCanvas({
  points,
  polyline,
  userLocation,
}: {
  points?: Point[];
  polyline?: Point[];
  userLocation?: Point | null;
}) {
  const all = [...(points ?? []), ...(polyline ?? [])];
  const center: [number, number] = all[0] ? [all[0].lat, all[0].lng] : [-33.333, -60.217];

  return (
    <MapContainer center={center} zoom={13} className="h-[70vh] w-full rounded-evhsa" scrollWheelZoom>
      <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {polyline?.length ? <Polyline positions={polyline.map((p) => [p.lat, p.lng])} color="#E22815" weight={5} /> : null}
      {(points ?? []).map((point, index) => (
        <Marker key={`${point.lat}-${point.lng}-${index}`} position={[point.lat, point.lng]} icon={stopIcon}>
          {point.label ? <Popup>{point.label}</Popup> : null}
        </Marker>
      ))}
      {userLocation ? (
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>Tu ubicación (opcional)</Popup>
        </Marker>
      ) : null}
      <Fit points={all} />
    </MapContainer>
  );
}
