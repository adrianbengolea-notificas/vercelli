export const site = {
  name: "EVHSA",
  legalName: "EMPRESA VERCELLI HNOS S.A.",
  tagline: "Conectamos personas, acercamos destinos",
  originalUrl: "https://www.e-evhsa.com.ar/",
  email: "evhsa@e-evhsa.com.ar",
  phoneMain: "4449400",
  phoneSchedules: "4449450",
  address: "Av. Perón 2425. San Nicolás. Bs As. Argentina.",
  mapQuery: "https://maps.google.com/maps?q=vercelli&t=k&z=17&ie=UTF8&iwloc=&output=embed",
  social: {
    facebook: "https://es-la.facebook.com/empVercelli/",
    instagram: "https://www.instagram.com/evhsatransporte/?hl=es",
  },
  offices: [
    {
      name: "Sede madre",
      detail: "Calle Nación 670. Sector administrativo y taller.",
    },
    {
      name: "Sede de servicio",
      detail: "Pte. Perón 1334. Mayoría de la flota y área de Servicio.",
    },
    {
      name: "Atención al usuario — San Nicolás",
      detail: "Almafuerte 19, San Nicolás.",
    },
    {
      name: "Atención al usuario — San Pedro",
      detail: "Local N° 6 de la Terminal, San Pedro.",
    },
    {
      name: "Actualización Mi Boleto",
      detail: "Pte. Perón 2425, lunes a viernes de 08.00 a 13.00. También a bordo.",
    },
  ],
} as const;

export const scheduleLines = [
  "227",
  "230",
  "342",
  "374",
  "375",
  "500",
  "501",
  "502",
  "503",
  "504",
  "505",
  "506",
  "507",
  "510",
  "512",
  "520",
  "521",
  "522",
  "523",
  "524",
  "1342",
  "2342",
  "3342",
  "4342",
  "500R",
] as const;

export type ScheduleLine = (typeof scheduleLines)[number];
