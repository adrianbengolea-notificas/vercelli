"use client";

import { useState } from "react";
import { cities, documentTypes, educationLevels, jobPositions, licenseCategories, maritalStatus } from "@/data/forms";
import { submitCollection, uploadPrivateFile } from "@/lib/firebase/submit";

export function CvForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [puesto, setPuesto] = useState("1");
  const [ciudad, setCiudad] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("empresa"))) return;
    const required = ["Nombre", "Apellido", "NroDocumento", "FechaNacimiento", "EstadoCivilID", "ExperienciaLaboral"];
    if (required.some((key) => !String(data.get(key) || "").trim())) {
      setError("(*) Los campos con asteríscos son obligatorios.-");
      setStatus("error");
      return;
    }
    const payload: Record<string, unknown> = {};
    data.forEach((value, key) => {
      if (key !== "Archivo" && key !== "empresa") payload[key] = String(value);
    });
    try {
      const created = crypto.randomUUID();
      const file = data.get("Archivo");
      if (file instanceof File && file.size > 0) {
        if (file.size > 5 * 1024 * 1024) throw new Error("El archivo supera el tamaño permitido.");
        payload.archivoPath = await uploadPrivateFile(`job-applications/${created}/${file.name}`, file);
      }
      payload.publicId = created;
      setId(await submitCollection("jobApplications", payload));
      setStatus("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar el curriculum.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return <p className="rounded-evhsa border bg-white p-5">Curriculum recibido. Identificador interno: {id}. Nos pondremos en contacto ni bien tengamos la necesidad.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-2">
      <p className="sr-only"><label>Empresa<input name="empresa" tabIndex={-1} autoComplete="off" /></label></p>
      <fieldset className="rounded-evhsa border bg-white p-5 shadow-card">
        <legend className="px-2 font-bold">DATOS PERSONALES</legend>
        <label className="mt-3 block text-sm">Foto / adjunto PDF
          <input type="file" name="Archivo" accept="image/*,.pdf" className="mt-1 block w-full text-sm" />
        </label>
        <p className="text-xs text-evhsa-muted">Tamaño máximo original de foto: 150Kb. En este portal se admite PDF o imagen, con almacenamiento privado.</p>
        <label className="mt-3 block text-sm">(*) Nombre:<input name="Nombre" maxLength={75} className="mt-1 w-full rounded-xl" /></label>
        <label className="mt-3 block text-sm">(*) Apellido:<input name="Apellido" maxLength={75} className="mt-1 w-full rounded-xl" /></label>
        <label className="mt-3 block text-sm">(*) TipoDocumento
          <select name="TipoDocumento" className="mt-1 w-full rounded-xl">{documentTypes.map((item) => <option key={item}>{item}</option>)}</select>
        </label>
        <label className="mt-3 block text-sm">(*) Nro.Documento:<input name="NroDocumento" maxLength={10} className="mt-1 w-full rounded-xl" /></label>
        <label className="mt-3 block text-sm">(*) Fec.Nacimiento:<input type="date" name="FechaNacimiento" className="mt-1 w-full rounded-xl" /></label>
        <label className="mt-3 block text-sm">Sexo
          <select name="Sexo" defaultValue="S" className="mt-1 w-full rounded-xl">
            <option value="S">Seleccione..</option>
            <option value="M">MASCULINO</option>
            <option value="F">FEMENINO</option>
          </select>
        </label>
        <label className="mt-3 block text-sm">(*) Estado civil:
          <select name="EstadoCivilID" className="mt-1 w-full rounded-xl">
            <option value="">Seleccione..</option>
            {maritalStatus.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
        <label className="mt-3 block text-sm">Dirección:<input name="Direccion" maxLength={75} className="mt-1 w-full rounded-xl" /></label>
        <label className="mt-3 block text-sm">Localidad:
          <select name="CiudadID" value={ciudad} onChange={(e) => setCiudad(e.target.value)} className="mt-1 w-full rounded-xl">
            <option value="">Seleccione..</option>
            {cities.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
        {ciudad === "9" ? <label className="mt-3 block text-sm">Otra Ciudad<input name="Ciudad" className="mt-1 w-full rounded-xl" /></label> : null}
        <label className="mt-3 block text-sm">Teléfono:<input name="Telefono" className="mt-1 w-full rounded-xl" /></label>
        <label className="mt-3 block text-sm">E-mail:<input type="email" name="Email" className="mt-1 w-full rounded-xl" /></label>
      </fieldset>
      <fieldset className="rounded-evhsa border bg-white p-5 shadow-card">
        <legend className="px-2 font-bold">DATOS LABORALES</legend>
        <label className="mt-3 block text-sm">Estudio finalizado:
          <select name="TipoEstudioID" className="mt-1 w-full rounded-xl">
            <option value="">Seleccione..</option>
            {educationLevels.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
        <label className="mt-3 block text-sm">Título:<input name="Titulo" className="mt-1 w-full rounded-xl" /></label>
        <label className="mt-3 block text-sm">Institución:<input name="Institucion" className="mt-1 w-full rounded-xl" /></label>
        <label className="mt-3 block text-sm">Puesto:
          <select name="PuestoID" value={puesto} onChange={(e) => setPuesto(e.target.value)} className="mt-1 w-full rounded-xl">
            {jobPositions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
        {puesto === "2" ? (
          <label className="mt-3 block text-sm">Categoría carnet:
            <select name="CategoriaCarnetID" className="mt-1 w-full rounded-xl">
              <option value="" />
              {licenseCategories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
        ) : null}
        <label className="mt-3 block text-sm">(*) Experiencia laboral:<textarea name="ExperienciaLaboral" maxLength={8000} rows={5} className="mt-1 w-full rounded-xl" /></label>
        <label className="mt-3 block text-sm">Referencias:<textarea name="Referencias" maxLength={8000} rows={4} className="mt-1 w-full rounded-xl" /></label>
        <label className="mt-3 block text-sm">Observaciones:<textarea name="Observaciones" maxLength={8000} rows={4} className="mt-1 w-full rounded-xl" /></label>
      </fieldset>
      <p className="lg:col-span-2 font-semibold text-evhsa-red">(*) Los campos con asteríscos son obligatorios.-</p>
      <p className="lg:col-span-2 text-xs text-evhsa-muted">Los CV se almacenan de forma privada, con acceso restringido a administración. Finalidad: evaluación laboral. Derechos: Ley 25.326.</p>
      {status === "error" ? <p className="lg:col-span-2 text-sm text-evhsa-red">{error}</p> : null}
      <div className="flex gap-3 lg:col-span-2">
        <button className="rounded-full bg-evhsa-red px-6 py-3 font-semibold text-white" type="submit">enviar</button>
        <button className="rounded-full border px-6 py-3" type="reset">borrar</button>
      </div>
    </form>
  );
}
