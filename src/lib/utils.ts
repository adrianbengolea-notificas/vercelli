export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function todayISO() {
  return todayInputValue();
}

export function isoToDisplay(iso: string) {
  return toOfficialDate(iso);
}

export function weekdayLabel(iso: string) {
  return dayTypeLabel(iso);
}

export function dayTypeFromIso(iso: string): "weekday" | "saturday" | "sunday" {
  const date = new Date(`${iso}T12:00:00`);
  const day = date.getDay();
  if (day === 0) return "sunday";
  if (day === 6) return "saturday";
  return "weekday";
}

export function todayInputValue() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function toOfficialDate(iso: string) {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

export function dayTypeLabel(iso: string) {
  const date = new Date(`${iso}T12:00:00`);
  const day = date.getDay();
  if (day === 0) return "Domingo";
  if (day === 6) return "Sábado";
  return "Día hábil";
}

export function ticketId(prefix: string) {
  const now = new Date();
  const stamp = now.toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${rand}`;
}

export function parseTimeToMinutes(value: string) {
  const [h, m] = value.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

export function currentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}
