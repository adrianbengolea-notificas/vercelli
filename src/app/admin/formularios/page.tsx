import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { listRecords } from "@/lib/storage/inbox";

export default async function FormulariosAdminPage() {
  const jar = await cookies();
  if (jar.get("evhsa_admin")?.value !== "1") redirect("/admin/login");
  const records = await listRecords();
  return (
    <div>
      <h1 className="font-display text-3xl">Formularios recibidos</h1>
      <p className="mt-2 text-sm text-evhsa-muted">Los archivos de CV no se sirven públicamente.</p>
      <div className="mt-6 overflow-auto rounded-2xl bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-evhsa-sand">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-t">
                <td className="p-3 font-mono text-xs">{record.id}</td>
                <td className="p-3">{record.type}</td>
                <td className="p-3">{new Date(record.createdAt).toLocaleString("es-AR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
