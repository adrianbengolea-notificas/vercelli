import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "");
  const password = String(body.password ?? "");
  const expectedEmail = process.env.ADMIN_BOOTSTRAP_EMAIL ?? "admin@local.test";
  const expectedPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD ?? "cambiar-en-produccion";

  if (email !== expectedEmail || password !== expectedPassword) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, mode: "bootstrap-local" });
  res.cookies.set("evhsa_admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
