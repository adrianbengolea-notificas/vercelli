# Auditoría del sitio original EVHSA

Fuente revisada: https://www.e-evhsa.com.ar/ (18/11/2026)

## Identidad

- Razón social: EMPRESA VERCELLI HNOS S.A.
- Logo original: `/images/logo.png`
- Colores institucionales: rojo `#E22815`, verde `#11671B` / `#487251`, blanco
- Tipografías originales: Abel, ABeeZee, Bitter
- Dirección: Av. Perón 2425. San Nicolás. Bs As. Argentina.
- Teléfonos: 4449400 (central) y 4449450 (horarios y servicios)
- Mail: evhsa@e-evhsa.com.ar
- Redes publicadas en el código de horarios: Facebook empVercelli e Instagram evhsatransporte

## Mapa de URLs revisadas

| URL original | Estado | Notas |
| --- | --- | --- |
| `/` | Migrada | Home, slider de 6 fotos, novedades, accesos |
| `/Empresa/Antecedentes` | Migrada | Texto completo + foto institucional |
| `/Empresa/Historia` | Migrada | Reseña completa 1962-2014 + 2 imágenes |
| `/Empresa/Objetivos` | Migrada | 6 objetivos |
| `/Empresa/QuienesSomos` | Migrada | Sedes, áreas y recursos |
| `/Empresa/Servicios` | Migrada | Listado de líneas urbanas y provinciales |
| `/Empresa/Calidad` | Migrada | Política ISO 9001 + imagen del certificado |
| `/Horarios` | Migrada | Filtro fecha + línea, endpoint `/Horarios/Filtro` |
| `/Recorridos` | Migrada | Google Maps original; GPS `getLineasRamalesSnyProvi` |
| `/Recorrido` | Redirige | Alias del acceso rápido de home |
| `/Paradas` | Migrada | `paradasbysentidoramal` |
| `/ObjetosPerdidos` | Migrada | Formulario + listado histórico 2016-2017 |
| `/Contacto?m=CONSULTA` | Migrada | Formulario |
| `/Contacto?m=RECLAMO` | Migrada | Mismos campos, destino RECLAMO |
| `/PreguntasFrecuentes/Faqs` | Migrada | 7 preguntas |
| `/Curriculum/CargarCV` | Migrada | Todos los campos originales |
| `/Fotos/Galeria` | Migrada | 5 fotografías institucionales |
| `/Novedades/Lista` | Migrada | COVID-19 06/04/2020 |
| `/robots.txt` y `/sitemap.xml` | No existían | El original devolvía HTML de error |

## APIs oficiales detectadas

- `POST https://www.e-evhsa.com.ar/Horarios/Filtro` `{ fecha, nroLinea }`
- `GET https://www.e-evhsa.com.ar/Horarios/Lineas` (comentado en el original)
- `GET https://www.e-evhsa.com.ar/Recorridos/getRecorridosToWeb/{id_ramal}`
- `GET https://www.e-evhsa.com.ar/Novedades/GetNovedadById/{id}`
- `GET https://gpsevhsa.com/getLineasRamalesSnyProvi`
- `POST https://gpsevhsa.com/paradasbysentidoramal` `{ sentido, id_ramal }`

## Líneas del selector de horarios

227, 230, 342, 374, 375, 500, 501, 502, 503, 504, 505, 506, 507, 510, 512, 520, 521, 522, 523, 524, 1342, 2342, 3342, 4342, 500R.

Consulta del 18/11/2026: varias líneas urbanas devolvieron horarios programados; 227, 374, 375, 520-524, 1342-4342 y 500R devolvieron `{ data: [] }` para esa fecha. Eso se conserva: no se inventan horarios.

## Pendiente de importación (sin invención)

- Polilíneas de algunos ramales si `/Recorridos/getRecorridosToWeb` responde vacío.
- Actualización posterior del listado de objetos perdidos (el publicado termina en 2017).
- Documentos de calidad descargables: en la página original solo hay la imagen ISO, no un PDF.
- Clave propia de Google Maps Platform (el original usa una clave en el frontend; no se reutiliza).
