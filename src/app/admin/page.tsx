import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { listRecords } from "@/lib/storage/inbox";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import { isAdminSdkConfigured } from "@/lib/firebase/admin";

export default async function AdminHomePage() {
  const jar = await cookies();
  if (jar.get("evhsa_admin")?.value !== "1") redirect("/admin/login");
  const records = await listRecords();
  return (
    <div>
      <h1 className="font-display text-3xl">Resumen operativo</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl bg-white p-5 shadow-card">
          <p className="text-sm text-evhsa-muted">Formularios recibidos</p>
          <p className="mt-2 text-3xl font-semibold">{records.length}</p>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow-card">
          <p className="text-sm text-evhsa-muted">Firebase web</p>
          <p className="mt-2">{isFirebaseConfigured() ? "Configurado" : "Pendiente (usar .env.example)"}</p>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow-card">
          <p className="text-sm text-evhsa-muted">Firebase Admin SDK</p>
          <p className="mt-2">{isAdminSdkConfigured() ? "Configurado" : "Pendiente"}</p>
        </article>
      </div>
      <p className="mt-6 max-w-3xl text-sm text-evhsa-muted">
        El panel permite administrar horarios, líneas, paradas, novedades, avisos, textos, FAQs, fotografías y formularios.
        En este entorno de pruebas los envíos se guardan de forma privada en data/inbox. Con Firebase se persisten en Firestore y Storage, con App Check y reglas de seguridad.
      </p>
    </div>
  );
}
