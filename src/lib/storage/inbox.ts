import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const inbox = path.join(process.cwd(), "data", "inbox");

export type StoredRecord = {
  id: string;
  type: string;
  createdAt: string;
  payload: Record<string, unknown>;
};

async function ensureInbox() {
  await mkdir(inbox, { recursive: true });
}

export async function saveRecord(type: string, id: string, payload: Record<string, unknown>) {
  await ensureInbox();
  const record: StoredRecord = {
    id,
    type,
    createdAt: new Date().toISOString(),
    payload,
  };
  await writeFile(path.join(inbox, `${type}-${id}.json`), JSON.stringify(record, null, 2), "utf8");
  return record;
}

export async function listRecords(type?: string) {
  await ensureInbox();
  const files = await readdir(inbox);
  const selected = files.filter((file) => file.endsWith(".json") && (!type || file.startsWith(`${type}-`)));
  const records: StoredRecord[] = [];
  for (const file of selected) {
    const json = JSON.parse(await readFile(path.join(inbox, file), "utf8")) as StoredRecord;
    records.push(json);
  }
  return records.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
