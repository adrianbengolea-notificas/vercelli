"use client";

import { useState } from "react";
import { cities, civilStatus, documentTypes, jobPositions, licenseCategories, studyTypes } from "@/content/forms";
import { PrivacyNote } from "@/components/forms/PrivacyNote";

export function JobForm() {
  const [status, setStatus] = useState<{ ok?: boolean; id?: string; error?: string; message?: string } | null>(null);
  const [otherCity, setOtherCity] = useState(false);
  const [driver, setDriver] = useState(false);
  const [expLeft, setExpLeft] = useState(8000);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch("/api/cv", { method: "POST", body: new FormData(event.currentTarget) });
    const json = await res.json();
    setStatus(json);
    if (json.ok) event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" encType="multipart/form-data">
      <div className="grid gap-6 lg:grid-cols-2">
        <fieldset className="rounded-evhsa bg-white p-6 shadow-card">
          <legend className="px-2 text-sm font-semibold uppercase tracking-widest text-evhsa-red">Datos personales</legend>
          <label className="mt-4 block text-sm">
            Foto [Tamaño máximo: 150Kb]
            <input className="mt-1 block w-full" type="file" name="Archivo" accept="image/*" />
          </label>
          <label className="mt-3 block">(*) Nombre:<input name="Nombre" maxLength={75} className="mt-1 w-full rounded-xl" required /></label>
          <label className="mt-3 block">(*) Apellido:<input name="Apellido" maxLength={75} className="mt-1 w-full rounded-xl" required /></label>
          <label className="mt-3 block">(*) TipoDocumento
            <select name="TipoDocumento" className="mt-1 w-full rounded-xl">{documentTypes.map((item) => <option key={item}>{item}</option>)}</select>
          </label>
          <label className="mt-3 block">(*) Nro.Documento:<input name="NroDocumento" maxLength={10} className="mt-1 w-full rounded-xl" required /></label>
          <label className="mt-3 block">(*) Fec.Nacimiento:<input type="date" name="FechaNacimiento" className="mt-1 w-full rounded-xl" required /></label>
          <label className="mt-3 block">Sexo
            <select name="Sexo" className="mt-1 w-full rounded-xl">
              <option value="S">Seleccione..</option>
              <option value="M">MASCULINO</option>
              <option value="F">FEMENINO</option>
            </select>
          </label>
          <label className="mt-3 block">(*) Estado civil:
            <select name="EstadoCivilID" className="mt-1 w-full rounded-xl" required>
              <option value="">Seleccione..</option>
              {civilStatus.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
          <label className="mt-3 block">Dirección:<input name="Direccion" maxLength={75} className="mt-1 w-full rounded-xl" /></label>
          <label className="mt-3 block">Localidad:
            <select name="CiudadID" className="mt-1 w-full rounded-xl" onChange={(e) => setOtherCity(e.target.value === "9")}>
              <option value="">Seleccione..</option>
              {cities.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
          {otherCity ? <label className="mt-3 block">Otra Ciudad<input name="Ciudad" className="mt-1 w-full rounded-xl" /></label> : null}
          <label className="mt-3 block">Teléfono:<input name="Telefono" className="mt-1 w-full rounded-xl" /></label>
          <label className="mt-3 block">E-mail:<input type="email" name="Email" className="mt-1 w-full rounded-xl" /></label>
        </fieldset>

        <fieldset className="rounded-evhsa bg-white p-6 shadow-card">
          <legend className="px-2 text-sm font-semibold uppercase tracking-widest text-evhsa-red">Datos laborales</legend>
          <label className="mt-4 block">Estudio finalizado:
            <select name="TipoEstudioID" className="mt-1 w-full rounded-xl">
              <option value="">Seleccione..</option>
              {studyTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
          <label className="mt-3 block">Título:<input name="Titulo" maxLength={150} className="mt-1 w-full rounded-xl" /></label>
          <label className="mt-3 block">Institución:<input name="Institucion" maxLength={150} className="mt-1 w-full rounded-xl" /></label>
          <label className="mt-3 block">Puesto:
            <select name="PuestoID" className="mt-1 w-full rounded-xl" onChange={(e) => setDriver(e.target.value === "2")}>
              {jobPositions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
          {driver ? (
            <label className="mt-3 block">Categoría carnet:
              <select name="CategoriaCarnetID" className="mt-1 w-full rounded-xl">
                <option value=""></option>
                {licenseCategories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </label>
          ) : null}
          <label className="mt-3 block">(*) Experiencia laboral:
            <textarea name="ExperienciaLaboral" maxLength={8000} rows={6} className="mt-1 w-full rounded-xl" required onChange={(e) => setExpLeft(8000 - e.target.value.length)} />
            <span className="text-xs">Caracteres restantes: {expLeft}</span>
          </label>
          <label className="mt-3 block">Referencias:<textarea name="Referencias" maxLength={8000} rows={4} className="mt-1 w-full rounded-xl" /></label>
          <label className="mt-3 block">Observaciones:<textarea name="Observaciones" maxLength={8000} rows={4} className="mt-1 w-full rounded-xl" /></label>
          <label className="mt-3 block text-sm">Curriculum en PDF
            <input className="mt-1 block w-full" type="file" name="CurriculumPdf" accept="application/pdf" />
          </label>
        </fieldset>
      </div>
      <p className="font-semibold text-evhsa-red">(*) Los campos con asteríscos son obligatorios.-</p>
      <PrivacyNote />
      <div className="flex gap-3">
        <button className="rounded-full bg-evhsa-green px-5 py-3 font-semibold text-white" type="submit">enviar</button>
        <button className="rounded-full border px-5 py-3" type="reset">borrar</button>
      </div>
      {status?.ok ? <p className="rounded-xl bg-emerald-50 p-3">Solicitud {status.id}. {status.message}</p> : null}
      {status?.error ? <p className="text-evhsa-red">{status.error}</p> : null}
    </form>
  );
}
