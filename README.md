# EVHSA — portal institucional

Modernización integral del sitio de **EMPRESA VERCELLI HNOS S.A.**, con fidelidad al contenido original de [https://www.e-evhsa.com.ar/](https://www.e-evhsa.com.ar/) y una experiencia mobile-first.

## Qué incluye

- Sitio público en Next.js (App Router) + TypeScript + Tailwind CSS.
- Consulta de horarios con datos oficiales (`POST /Horarios/Filtro`) y snapshot de respaldo.
- Recorridos y paradas desde `gpsevhsa.com`.
- Formularios de contacto, reclamos, objetos perdidos y CV.
- Panel de administración preparado para Firebase Authentication y Firestore.
- Redirecciones 301 de las URLs originales.

## Inicio rápido

```bash
npm install
copy .env.example .env.local
npm run dev
```

Panel de pruebas: `/admin/login`  
Usuario bootstrap: `admin@local.test` / `cambiar-en-produccion`

## Documentación

- `docs/AUDITORIA.md` — inventario del sitio original
- `docs/MIGRACION.md` — matriz de URLs y estados
- `docs/DESPLIEGUE.md` — Firebase y dominio
- `docs/DIFERENCIAS.md` — diferencias respecto del sitio anterior

No modificar DNS ni reemplazar el sitio en producción sin autorización expresa.
