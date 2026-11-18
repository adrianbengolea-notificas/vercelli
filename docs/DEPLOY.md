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

## App Hosting (Next.js)

Este sitio usa API routes, así que se publica con **Firebase App Hosting**, no como estático.

1. Conectar el repositorio `adrianbengolea-notificas/vercelli` en Firebase Console → App Hosting.
2. Backend: `vercelli`, rama `main`, directorio raíz `/`.
3. Cada `git push` a `main` dispara un rollout.
4. La URL inicial será `https://vercelli--vercelli-2665c.<region>.hosted.app`.

Despliegue local (requiere la cuenta con permisos del proyecto):

```bash
firebase deploy --only apphosting --project vercelli-2665c
firebase deploy --only firestore:rules,storage --project vercelli-2665c
```

No cambiar DNS ni el correo de `e-evhsa.com.ar` sin autorización explícita. El MX debe permanecer intacto durante cualquier corte de dominio.

HTTPS y el dominio `www.e-evhsa.com.ar` se configuran en Firebase Hosting / App Hosting recién cuando EVHSA lo autorice.

## Variables sensibles

La `apiKey` web de Firebase es pública por diseño y se protege con reglas. Las credenciales de cuenta de servicio (`FIREBASE_PRIVATE_KEY`) solo van en el servidor.
