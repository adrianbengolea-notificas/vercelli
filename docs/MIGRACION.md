# Matriz de migración

| Original | Nueva URL | Contenido | Funcionalidad | Recursos | Estado |
| --- | --- | --- | --- | --- | --- |
| `/` | `/` | Home, novedades, slider | Buscador de horarios | logo, slides 1-6 | Implementado |
| `/Empresa/Antecedentes` | `/empresa/antecedentes` | Texto original | Institucional | img_empresa_01.jpg | Implementado + 301 |
| `/Empresa/Historia` | `/empresa/historia` | Texto original | Timeline derivada de fechas del texto | img_historia_01/02 | Implementado + 301 |
| `/Empresa/Objetivos` | `/empresa/objetivos` | Texto original | Institucional | header antecedentes | Implementado + 301 |
| `/Empresa/QuienesSomos` | `/empresa/quienes-somos` | Texto original | Institucional | header | Implementado + 301 |
| `/Empresa/Servicios` | `/empresa/el-servicio` | Listado de líneas | Enlaces a horarios/recorridos | img_colectivo_01.jpg | Implementado + 301 |
| `/Empresa/Calidad` | `/empresa/calidad` | Política ISO | Institucional | img_iso9001.jpg | Implementado + 301 |
| `/Horarios` | `/horarios` | Filtro fecha/línea | Live official API + snapshot | hdr_horarios.jpg | Implementado + 301 |
| `/Recorridos` | `/recorridos` | Mapa de ramales | GPS oficial + OSM | — | Implementado + 301 |
| `/Paradas` | `/paradas` | Lista por línea | GPS oficial + geo opcional | — | Implementado + 301 |
| `/ObjetosPerdidos` | `/atencion/objetos-perdidos` | Formulario + tabla | Alta privada | hdr_objetosperdidos.jpg | Implementado + 301 |
| `/Contacto?m=CONSULTA` | `/contacto` | Formulario | Validación + ID | hdr_contacto.jpg | Implementado + 301 |
| `/Contacto?m=RECLAMO` | `/atencion/reclamos` y `/contacto?m=RECLAMO` | Mismos campos | ID de solicitud | hdr_reclamos.jpg | Implementado + 301 |
| `/PreguntasFrecuentes/Faqs` | `/atencion/preguntas-frecuentes` | 7 FAQs | Buscador y acordeón | hdr_faqs.jpg | Implementado + 301 |
| `/Curriculum/CargarCV` | `/rrhh/cargar-cv` | Todos los campos | Foto + PDF privado | hdr_ccv.jpg | Implementado + 301 |
| `/Fotos/Galeria` | `/galeria` | 5 fotos | Galería | /images/Fotos/* | Implementado + 301 |
| `/Novedades/Lista` | `/novedades` | COVID-19 | Detalle | GetNovedadById/371 | Implementado + 301 |

Los submenús de Empresa, RRHH y Atención conservan todas las secciones originales.
