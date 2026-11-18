# Instalación y despliegue

## Entorno local

1. Node.js 20+.
2. `npm install`
3. Copiar `.env.example` a `.env.local`
4. `npm run dev` → http://localhost:3000
5. `npm run build` / `npm start` para producción local.

## Firebase

El frontend está preparado para Firebase Authentication, Firestore, Storage y App Check. No se incluyen credenciales.

Colecciones previstas: `lines`, `routes`, `stops`, `schedules`, `serviceCalendars`, `serviceAlerts`, `news`, `institutionalPages`, `faqs`, `contactRequests`, `complaints`, `lostObjects`, `jobApplications`, `administrators`, `auditLogs`.

Hasta configurar el proyecto Firebase:

- Horarios se consultan al sistema original y, si no responde, al snapshot importado.
- Formularios se guardan en `data/inbox` (fuera del árbol público).
- CVs en `data/uploads/cv`.

Reglas: `firestore.rules` y `storage.rules`.

## Hosting Next.js

Usar **Firebase App Hosting** o un runtime Node (Cloud Run / App Hosting). No servir este proyecto como SPA estática en Firebase Hosting clásico.

## Dominio https://www.e-evhsa.com.ar/

1. Desplegar en un entorno de pruebas independiente.
2. Configurar HTTPS y `NEXT_PUBLIC_SITE_URL`.
3. No cambiar DNS ni el sitio actual sin autorización.
4. Preservar registros MX/SPF/DKIM de correo durante cualquier corte de DNS.
5. Activar las redirecciones 301 ya definidas en `next.config.ts`.

## Mapas

Por defecto se usa OpenStreetMap. Si EVHSA provee una clave propia de Google Maps Platform, cargar `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`. No reutilizar la clave publicada en el sitio original.
