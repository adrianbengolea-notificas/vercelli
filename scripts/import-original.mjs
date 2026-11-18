import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "audit", "api");
const outDir = path.join(root, "src", "data");

await mkdir(outDir, { recursive: true });

const files = await readdir(apiDir);
const scheduleFiles = files.filter((f) => f.startsWith("horarios_") && f.endsWith(".json"));

const snapshots = {};
for (const file of scheduleFiles) {
  const raw = JSON.parse(await readFile(path.join(apiDir, file), "utf8"));
  const name = file.replace("horarios_", "").replace(".json", "");
  const parts = name.split("_");
  const line = parts[0];
  let date = "18/11/2026";
  if (parts[1] === "21112026") date = "21/11/2026";
  if (parts[1] === "22112026") date = "22/11/2026";
  const key = `${line}|${date}`;
  snapshots[key] = {
    line,
    date,
    source: "https://www.e-evhsa.com.ar/Horarios/Filtro",
    importedAt: "2026-11-18",
    data: raw.data ?? [],
    rows: raw.rows ?? 0,
  };
}

await writeFile(
  path.join(outDir, "schedule-snapshots.json"),
  JSON.stringify(
    {
      source: "Consulta oficial POST /Horarios/Filtro del sitio original",
      note: "Datos programados importados. No son estimaciones ni información en tiempo real.",
      snapshots,
    },
    null,
    2,
  ),
);

const linesRaw = JSON.parse(await readFile(path.join(apiDir, "lineas_ramales.json"), "utf8"));
await writeFile(path.join(outDir, "lineas-ramales.json"), JSON.stringify(linesRaw, null, 2));

const html = await readFile(path.join(root, "audit", "ObjetosPerdidos.html"), "utf8");
const rows = [];
const re = /<tr>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>/gi;
let match;
while ((match = re.exec(html))) {
  const description = match[1].replace(/<[^>]+>/g, "").trim();
  const name = match[2].replace(/<[^>]+>/g, "").trim();
  const found = match[3].replace(/<[^>]+>/g, "").trim();
  if (description && description !== "Descripcion") {
    rows.push({ description, name, found });
  }
}
await writeFile(path.join(outDir, "lost-objects.json"), JSON.stringify(rows, null, 2));

console.log(`Schedules: ${Object.keys(snapshots).length}`);
console.log(`Lost objects: ${rows.length}`);
console.log(`GPS lines: ${linesRaw.data?.length ?? 0}`);
