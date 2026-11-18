# Instalación y despliegue

Proyecto Firebase: `vercelli-2665c`  
Hosting vinculado: `vercelli-2665c`  
App web: `vercellihnos` (`1:641113588096:web:ec4453a34669f5da010165`)

## Entorno de pruebas

1. `npm install`
2. Configurar `.env.local` (ver `.env.example`).
3. `npm run dev`
4. Crear usuario en Firebase Authentication.
5. Crear `administrators/{uid}` con `{ "active": true, "role": "admin", "email": "..." }`.
6. `firebase deploy --only firestore:rules,storage`

## Producción (cuando haya autorización)

Next.js no debe servirse como sitio estático puro si se usan API routes. Opciones:

- **Firebase App Hosting** (recomendada para Next.js).
- Cloud Run + rewrites de Firebase Hosting.

No cambiar DNS ni el correo de `e-evhsa.com.ar` sin autorización explícita. El MX debe permanecer intacto durante cualquier corte de dominio.

HTTPS y el dominio `www.e-evhsa.com.ar` se configuran en Firebase Hosting / App Hosting recién cuando EVHSA lo autorice.

## Variables sensibles

La `apiKey` web de Firebase es pública por diseño y se protege con reglas. Las credenciales de cuenta de servicio (`FIREBASE_PRIVATE_KEY`) solo van en el servidor.
