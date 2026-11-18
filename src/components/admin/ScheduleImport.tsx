"use client";

import { useState } from "react";

type Row = { linea: string; fecha: string; cabecera: string; hora: string };

function parseCsv(text: string): Row[] {
  return text
    .split(/\r?\n/)
    .slice(1)
    .map((line) => line.split(",").map((cell) => cell.trim()))
    .filter((cells) => cells.length >= 4 && cells[0] && cells[3])
    .map(([linea, fecha, cabecera, hora]) => ({ linea, fecha, cabecera, hora }));
}

export function ScheduleImport() {
  const [rows, setRows] = useState<Row[]>([]);
  const [message, setMessage] = useState("Todavía no hay un archivo cargado.");

  return (
    <div className="mt-6 space-y-4 rounded-2xl bg-white p-5 shadow-card">
      <label className="block text-sm font-semibold">
        Importar CSV / Excel exportado como CSV
        <input
          className="mt-2 block w-full"
          type="file"
          accept=".csv,text/csv"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const text = await file.text();
            const parsed = parseCsv(text);
            setRows(parsed);
            setMessage(parsed.length ? `${parsed.length} filas listas para vista previa.` : "El archivo no contiene filas válidas.");
          }}
        />
      </label>
      <p className="text-sm text-evhsa-muted">{message}</p>
      {rows.length ? (
        <div className="overflow-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-evhsa-sand">
                <th className="p-2">Línea</th>
                <th className="p-2">Fecha</th>
                <th className="p-2">Cabecera</th>
                <th className="p-2">Hora programada</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 50).map((row, index) => (
                <tr key={`${row.linea}-${index}`} className="border-t">
                  <td className="p-2">{row.linea}</td>
                  <td className="p-2">{row.fecha}</td>
                  <td className="p-2">{row.cabecera}</td>
                  <td className="p-2">{row.hora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <button className="rounded-full bg-evhsa-green px-5 py-2 text-white" type="button" disabled={!rows.length}>
        Publicar (requiere Firebase)
      </button>
    </div>
  );
}
