"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      setError("Credenciales inválidas");
      return;
    }
    router.push("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-evhsa-sand px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-evhsa bg-white p-8 shadow-card">
        <Image src="/original/logo.png" alt="EVHSA" width={181} height={64} className="h-12 w-auto" />
        <h1 className="mt-6 font-display text-3xl">Panel de administración</h1>
        <p className="mt-2 text-sm text-evhsa-muted">En producción se debe usar Firebase Authentication con roles. Este acceso bootstrap es solo para el entorno de pruebas.</p>
        <label className="mt-6 block">Email<input name="email" type="email" className="mt-1 w-full rounded-xl" required /></label>
        <label className="mt-4 block">Contraseña<input name="password" type="password" className="mt-1 w-full rounded-xl" required /></label>
        {error ? <p className="mt-3 text-sm text-evhsa-red">{error}</p> : null}
        <button className="mt-6 w-full rounded-full bg-evhsa-red py-3 font-semibold text-white" type="submit">Ingresar</button>
      </form>
    </main>
  );
}
