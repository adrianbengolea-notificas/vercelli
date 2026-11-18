export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const mainNav: NavItem[] = [
  { href: "/", label: "Inicio" },
  {
    href: "/empresa",
    label: "Empresa",
    children: [
      { href: "/empresa/antecedentes", label: "Antecedentes sociales" },
      { href: "/empresa/historia", label: "Historia" },
      { href: "/empresa/objetivos", label: "Objetivos" },
      { href: "/empresa/quienes-somos", label: "Quiénes somos" },
      { href: "/empresa/el-servicio", label: "El servicio" },
      { href: "/empresa/calidad", label: "Normas y políticas de calidad" },
    ],
  },
  { href: "/horarios", label: "Horarios" },
  { href: "/recorridos", label: "Recorridos" },
  { href: "/paradas", label: "Paradas" },
  {
    href: "/atencion",
    label: "Atención al usuario",
    children: [
      { href: "/atencion/objetos-perdidos", label: "Objetos perdidos" },
      { href: "/atencion/reclamos", label: "Reclamos y sugerencias" },
      { href: "/atencion/preguntas-frecuentes", label: "Preguntas frecuentes" },
      { href: "/galeria", label: "Galería" },
      { href: "/novedades", label: "Novedades" },
    ],
  },
  {
    href: "/rrhh",
    label: "RRHH",
    children: [{ href: "/rrhh/cargar-cv", label: "Cargar curriculum vitae" }],
  },
  { href: "/contacto", label: "Contacto" },
];

export const extraNav = [
  { href: "/novedades", label: "Novedades" },
  { href: "/galeria", label: "Galería" },
];

export const footerNav = [
  {
    title: "Empresa",
    links: [
      { href: "/empresa/historia", label: "Empresa" },
      { href: "/rrhh/cargar-cv", label: "RRHH" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
  {
    title: "Servicio",
    links: [
      { href: "/horarios", label: "Horarios" },
      { href: "/recorridos", label: "Recorridos" },
      { href: "/paradas", label: "Paradas" },
    ],
  },
  {
    title: "Atención",
    links: [
      { href: "/atencion/objetos-perdidos", label: "Objetos perdidos" },
      { href: "/atencion/reclamos", label: "Reclamos y sugerencias" },
      { href: "/atencion/preguntas-frecuentes", label: "Preguntas frecuentes" },
    ],
  },
];
