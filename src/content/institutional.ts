export type InstitutionalPage = {
  slug: string;
  originalPath: string;
  title: string;
  kicker: string;
  heading: string;
  image: string;
  paragraphs: string[];
  lists?: { intro?: string; items: string[] }[];
  images?: { src: string; alt: string; caption?: string }[];
};

export const institutionalPages: InstitutionalPage[] = [
  {
    slug: "antecedentes",
    originalPath: "/Empresa/Antecedentes",
    title: "Antecedentes sociales y laborales",
    kicker: "EMPRESA",
    heading: "Antecedentes Sociales y Laborales.",
    image: "/original/header/img_header_antecedentes.jpg",
    paragraphs: [
      "Empresa Vercelli Hnos. S.A. es una sociedad anónima constituida desde el año 1969 y dedicada a lo largo de los años al transporte de corta, media y larga distancia, turismo y transporte de personal a fábrica.",
      "Su reconocida trayectoria como Empresa y la de sus directivos, la ha llevado a ser invitada casi permanentemente en los concursos de precios tanto en el partido de San Nicolás, como así también en otras jurisdicciones distantes como Tierra del Fuego, Río Gallegos, Tartalgal (Salta), Ipasam (Sierra Grande), etc.",
      "Como antecedentes de prestaciones similares a la que aquí se ofrece, se destaca haber realizado el transporte de personal de Somisa durante 8 años con 41 vehículos, en Central Térmica San Nicolás con 10 vehículos, en YPF en Sade con 20 unidades durante 2 años, en Acindar S.A., en Mc Kee del Plata con 10 unidades durante 2 años, en Manferro S.A. con 4 unidades durante 4 años.",
      "En la actualidad explota las líneas provinciales 227, 230, 342, 374 y 375, las líneas urbanas 500, 501, 502, 503, 504, 505, 506, 507, 510 y 512 en la ciudad de San Nicolás y las líneas Urbanas 520, 521, 522 y 524 en la localidad de San Pedro.",
    ],
    images: [
      {
        src: "/original/img_empresa_01.jpg",
        alt: "Evhsa - Empresa 01",
      },
    ],
  },
  {
    slug: "historia",
    originalPath: "/Empresa/Historia",
    title: "Reseña histórica",
    kicker: "EMPRESA",
    heading: "Reseña Histórica",
    image: "/original/header/hdr_historia.jpg",
    paragraphs: [
      "Ante la necesidad de transportar los empleados de Somisa desde y hacia Villa Constitución, surge en 1962 una Empresa como Sociedad de hecho formada por Patricio y Ernesto Vercelli. Esta incipiente sociedad contaba con un único vehículo, chasis Ford, motor Perkins, año 1946. Los hermanos Vercelli eran a su vez, empleados de Somisa y esto complicaba un poco el trabajo por lo que deciden incorporar al tercer hermano, Diego (Jimmy para la familia). Después de los primeros meses, la demanda de transporte hizo ampliar la empresa a cuatro unidades y hace indispensable el acople de otro hermano más, en este caso el menor quien con solo 17 años pasa a formar parte del “plan”: Oscar. Este es el comienzo de nuestro gran sueño y así lo quiero contar:",
      "Por esas cosas que del destino o de Dios, ¡quién sabe!, aparece en nuestra vida el Sr. Rodino, quien era accionista de la Empresa Chevallier, él nos vendería dos coches de marca Aclo 1947. Con estos vehículos, se pudo atender la demanda solicitada y extendernos hasta Empalme Villa Constitución. Enseguida nomás incorporaríamos tres unidades más al incipiente parque automotor, cubriendo las necesidades locales de viajes de turismo, escolares, viajes especiales a ciudades de la zona y cualquier otro destino que fuera requerido. Siempre con la idea firme de trabajar y crecer formalizamos un contrato con Agua y Energía para el transporte de todo su personal, unos 900 empleados, para lo que debimos subcontratar vehículos particulares que reforzaban los pocos coches con los que contaba el emprendimiento familiar.",
      "En el año 1969, en San Nicolás la única empresa prestataria de transporte público era Sctall. Por estos tiempos y ya con alguna experiencia en el ramo vislumbramos que se podían introducir cambios y mejoras en este rubro y así nuestra empresa solicita permiso de prestación al Intendente, en ese momento el señor Miguel M. Bent, quien nos otorga un permiso precario para iniciar servicios de línea 510, siendo cabeceras en zona Sur: Savio y Bogado; en zona Oeste: Barrio Lonjazo hoy Parque Córdoba. Este permiso le es otorgado a una nueva razón social que da nacimiento a EMPRESA VERCELLI HNOS S.A. La prestación del servicio se inicia el 9 de junio de 1969 con cuatro unidades, dos de las cuales eran 0 kilómetro. Todas con puerta trasera para el descenso de pasajeros, una innovación para la época que permitía transportar más usuarios en menos tiempo y también unir a los barrios más distantes con el centro de la ciudad. A los cuatro días una denuncia de la Sctall hizo que se suspendieran los servicios por 17 días hasta que apareció en nuestra vida el sr. Carlos González quien podía ayudar a solucionar el problema. Con esta nueva colaboración se hicieron los trámites pertinentes y se pudieron reiniciar los servicios.",
      "En el año 1974 la Justicia paraliza los servicios de Sctall y el Municipio nos otorga el permiso para cubrir las líneas 502, 512 agregándose éstas a la prestación de la línea 510. Paralelamente la Dirección de Transporte de la Provincia de Buenos Aires nos otorga permiso para prestar los servicios de la línea 374 que unía Somisa- Don Américo, lo que significó un importante crecimiento no solo en unidades sino también en personal, se sumaban a empresa Vercelli Hnos., administrativos, choferes y técnicos, ya los hermanos dejábamos de ser ’’multifuncionales’’. Posteriormente vendrían contratos, como el 50 % del transporte de todo el personal de Somisa con 41 unidades, Agua y energía con 10 unidades, empresas Mcken/Sade y otras.",
      "En 1984 logramos tres contratos importantes con YPF en Río Gallegos con 26 unidades. Estando ya en la provincia de Santa Cruz y ante el pedido de aquel entonces Intendente Dr. Néstor Kirchner diseñamos dos líneas urbanas que aportaron un cambio muy positivo al transporte local que se mantiene hasta hoy. Dada el nivel de nuestro servicio, se nos pidió atender un contrato en Río Grande, Tierra del Fuego con 10 unidades para la administración de YPF Austral. Nuestra incursión patagónica finalizó en 1991 cuando expiró el contrato.",
      "En el año 2003, Empresa Vercelli adquiere a través de una compulsa de oferta la prestación de las líneas 504 y 506 que estaban a cargo de la empresa Hermae, ex. Don Bosco, a las que nosotros le agregamos como mejora de la prestación la línea 505. Ya en el 2004, la Dirección de Transporte de la Provincia, nos otorga el permiso de línea 227 uniendo las localidades de Conesa con Pergamino. Así después de este camino tan largo y rico en experiencias llega el año 2005 que le permite a Empresa Vercelli ostentar la certificación de servicios, bajo normas de gestión de calidad ISO 9001/2000, logro que nos llena de orgullo y nos posiciona como las mejores de la región. En octubre de 2007 dándonos un voto de confianza, otro más, y un desafío la Dirección de Transporte Provincial nos concede la prestación del servicio de línea 342 uniendo San Nicolás con Ramallo, El Paraíso, Gdor. Castro y San Pedro.",
      "Lamentablemente este logro se vio opacado por la muerte de nuestro querido Jimmy, hermano y socio que impactó duro en la familia y en el seno de la empresa. Él nos dejó el legado de seguir “con unidad, humildad y trabajo”, que nos comprometimos cumplir. El 25 de Octubre de 2010, Empresa Vercelli Hnos. renovó su sistema de abonos y credenciales fusionando los dos sistemas en uno. De esta manera, adoptó el Sistema Mi Boleto, contando con una rápida aceptación por parte del público usuario del transporte publico de pasajeros con más de 45.000 tarjetas emitidas hasta la fecha.",
      "A mediados del año 2011, la Empresa tomo prestación precaria del servicio local en la ciudad de San Pedro, cubriendo las líneas 520 A y B, 521. 522 y 524. Este logro se vio gratificado con la adjudicación de licitación pública en el año 2013, pudiendo así La Empresa, brindar el servicio con contrato municipal para brindar mejor confort a sus usuarios.",
      "Cabe destacar además, que todos estos resultados fueron coronados el día 24 de Septiembre de 2011, cuando el Honorable Concejo Deliberante de San Nicolas aprobó la adjudicación del servicio a Empresa Vercelli Hnos SA, mediante Licitación Publica por el periodo de 21 años.",
      "Y así nuestro viaje, se detiene sólo un instante en la garita de la actualidad y nos muestra que el 9 de junio de 2014, cumplimos 45 AÑOS DE VIDA, con una trayectoria que nos ha marcado una línea de conducta familiar, que los hermanos Vercelli hemos basado en responsabilidad de trabajo y que hoy con mucha satisfacción nos permite decir que es nuestro mejor capital.",
      "Felizmente estos 45 años se ven multiplicados no solo en unidades vehiculares sino en descendientes, hoy digo con orgullo que nuestros hijos, siguen lo que sembramos hace mas de cuarenta años. Ellos son nuestra continuación. Ellos hoy son los responsables de cada área y dirección general de la Empresa, quienes acompañados de la humanidad, dedicación y responsabilidad de todos nuestros empleados, algunos con más de 35 años en ella, hacen posible que lo que empezó como un sueño, una aventura, hoy sea esta realidad. Nuestro reconocimiento y agradecimiento a todos ellos.",
    ],
    images: [
      { src: "/original/img_historia_01.png", alt: "Evhsa - Historia 01" },
      { src: "/original/img_historia_02.png", alt: "Evhsa - Historia 02" },
    ],
  },
  {
    slug: "objetivos",
    originalPath: "/Empresa/Objetivos",
    title: "Objetivos",
    kicker: "EMPRESA",
    heading: "Objetivos",
    image: "/original/header/img_header_antecedentes.jpg",
    paragraphs: [
      "Esta política requiere el esfuerzo permanente en el trabajo cotidiano, y permanente búsqueda de nuevas y mejores condiciones para el transporte de pasajeros brindándole todas las comodidades posibles, habiendo implementado los siguientes procesos que agregan valor al traslado de personas y nos permiten marcar una diferencia sustancial a saber:",
    ],
    lists: [
      {
        items: [
          "Proporcionar a nuestros usuarios la comodidad que merecen a través de nuevas unidades, mayor tecnología y mejor calidad de servicio.",
          "El cumplimiento efectivo de los horarios comprometidos permitiendo al usuario administrar sus tiempos.",
          "Controlar el servicio de manera tal, que el usuario se sienta a gusto.",
          "Masificar los centros de recarga y las tarjetas Mi Boleto, a fin de que el usuario posea seguridad y comodidad.",
          "La incorporación de nuevas y modernas unidades al servicio brindando así mayor comodidad, seguridad y calidad del servicio a los pasajeros.",
          "Brindar el mejor servicio de San Nicolás y Alrededores.",
        ],
      },
    ],
  },
  {
    slug: "quienes-somos",
    originalPath: "/Empresa/QuienesSomos",
    title: "Quiénes somos",
    kicker: "EMPRESA",
    heading: "Quienes somos",
    image: "/original/header/img_header_antecedentes.jpg",
    paragraphs: [
      "La Empresa cuenta con dos sedes y dos Oficinas de Atención al Usuario. La sede madres, ubicada en calle Nación 670 es donde convergue el sector administrativo y taller. La sede de Pte Peron 1334, es donde reside la mayoría de la flota y el area de Servicio. Las dos oficinas de Atencion al Usuario están Ubicadas en Almafuerte 19 de la ciudad de San Nicolás y en el Local N° 6 de la Terminal en la localidad de San Pedro.  E.V.H.S.A cuenta con una de las flotas más modernas del país, conformando alrededor de 100 unidades con antigüedad menor a 3 años.",
      "La empresa está organizada en áreas que funcionan de manera autónoma, las cuales son:",
    ],
    lists: [
      {
        items: [
          "Administración de taller",
          "Tráfico y Servicio",
          "Inspección",
          "Recursos Humanos",
          "Tesorería y Contaduría",
          "Personal",
          "Recaudación",
          "Atención al público",
          "Siniestros",
          "Legales",
          "Mi Boleto",
        ],
      },
      {
        intro:
          "Todas ellas, trabajan conjuntamente con la Dirección de la Empresa, con el firme objetivo de mejorar los sistemas de cada día. Además cuenta con:",
        items: [
          "Playa de estacionamiento de unidades.",
          "Abastecimiento de combustible propio.",
          "Talleres donde se realizan mantenimientos preventivos, chapería, pintura, etc.",
          "Depósito con stock permanente de repuestos.",
          "Desarrollo propio de sistemas electrónicos en ómnibus.",
        ],
      },
    ],
  },
  {
    slug: "el-servicio",
    originalPath: "/Empresa/Servicios",
    title: "El servicio",
    kicker: "EMPRESA",
    heading: "El servicio",
    image: "/original/header/img_header_antecedentes.jpg",
    paragraphs: [
      "Actualmente la Empresa tiene la explotación de 6 líneas urbanas y 4 interurbanas.",
    ],
    images: [{ src: "/original/img_colectivo_01.jpg", alt: "Evhsa - Historia 01" }],
    lists: [
      {
        items: [
          "Línea 227: Línea Provincial que une la localidad de Conesa con Pergamino",
          "Línea 230: Línea Provincial que une la localidad de San Nicolás con Pergamino",
          "Linea 342 A: Línea Provincial que une las localidades de San Nicolás con  Villa Ramallo y Ramallo.",
          "Linea 342 B: Línea Provincial que une las localidades de San Nicolás con  Villa Ramallo, Ramallo,  Gobernador Castro y San Pedro.",
          "Linea 342 C: Línea Provincial que une las localidades de San Nicolás con Villa Gral Savio.",
          "Línea 374: Línea Provincial que une el Barrio Don Américo hasta portería Central de la Empresa Siderar (partido de Ramallo)",
          "Línea 375: Línea Provincial que une Arroyo del medio hasta portería Central de la Empresa Siderar (partido de Ramallo)",
          "Línea 500: Une las cabeceras de Terminal San Nicolas con general Rojo y Conesa.",
          "Línea 501: Une las cabeceras del Barrio Santa Clara y Barrio Somisa con un transbordo a Barrio Sironi.",
          "Línea 502: Une las cabeceras del Barrio Golf y El Parador San Nicolás",
          "Línea 503: Une las cabeceras del Arroyo del Medio y Barrio 7 de Septiembre.",
          "Línea 504: Une las cabeceras del Barrio Santa Rosa y Barrio Suizo",
          "Línea 505: Une las cabeceras del Barrio Las Viñas y Barrio Fraga",
          "Línea 506: Une las cabeceras del Barrio 12 de Marzo y Barrio Fonavi.",
          "Línea 507: Une las cabeceras del Barrio San Jorge con Barrio California y Barrio Sandrina.",
          "Línea 510: Une las cabeceras del Barrio San Francisco y Barrio Guemes",
          "Línea 512: Une las cabeceras del Barrio Los Fresnos y La Emilia",
          "Línea 520 A: Une las cabeceras de Terminal San Pedro y Gobernador castro.",
          "Línea 520 B: Une las cabeceras de Terminal San Pedro y Santa Lucia.",
          "Línea 521: Une las cabeceras de Escuela N° 10, Las Canaleta, B° Cassini y Cementerio.",
          "Línea 522: Une las cabeceras de Terminal San Pedro y Rio Tala.",
          "Línea 524: Une las cabeceras de Terminal San Pedro y Vuelta de Obligado.",
        ],
      },
    ],
  },
  {
    slug: "calidad",
    originalPath: "/Empresa/Calidad",
    title: "Normas y políticas de calidad",
    kicker: "EMPRESA",
    heading: "Normas de Calidad ISO 9001 y Políticas",
    image: "/original/header/img_header_antecedentes.jpg",
    paragraphs: [
      "La dinámica de las economías modernas imponen a las empresas la necesidad de ser cada vez mas eficientes en un mercado ampliamente competitivo. En ese entorno se desenvuelve nuestra empresa que además ha asumido desde sus inicios en el transporte de pasajeros, un amplio compromiso hacia los usuarios de sus servicios y hacia la comunidad toda. Para afianzar el desarrollo de sus actividades en un sistema de gestión de probada experiencia y reconocimiento mundial eligió las normas ISO 9001, desarrollando así un esquema participativo en el que todo el personal tiene en claro sus competencias y responsabilidades.",
      "Como evidencia de su compromiso la Ciudad de San Nicolás ha definido la siguiente:",
      "Asumiendo el compromiso de atender y satisfacer los requisitos explícitos e implícitos tanto fijados por la autoridad de aplicación como la comunidad, la EMPRESA VERCELLI HNOS S.A. establece la siguiente Política de la Calidad que tiene como objetivos prioritarios:",
      "El compromiso del personal es condición de empleo para acompañarnos en este desafío para el cual la Alta Dirección compromete su mas fuerte apoyo y dedicación en un marco de mejora continua.",
    ],
    images: [{ src: "/original/img_iso9001.jpg", alt: "Evhsa - Empresa 02" }],
    lists: [
      {
        items: [
          "Afianzar y mantener una posición de liderazgo en la prestación del servicio publico urbano de pasajeros.",
          "Crear las condiciones necesarias como para que tal actividad satisfaga las necesidades y expectativas de las partes interesadas entendiendo por tales al a organización, sus empleados y en general la comunidad toda.",
          "Establecer como prioritario el respeto al usuario privilegiando la calidad del servicio y la puntualidad del mismo, revalorizando de esta manera nuestro concepto de que el tiempo y la seguridad de cada pasajero es para nosotros lo mas importante.",
        ],
      },
    ],
  },
];

export const timeline = [
  { year: "1962", text: "Sociedad de hecho de Patricio y Ernesto Vercelli para transportar empleados de Somisa." },
  { year: "1969", text: "Nace EMPRESA VERCELLI HNOS S.A. El 9 de junio inicia la línea 510." },
  { year: "1974", text: "Permiso municipal para las líneas 502 y 512, y provincial para la 374." },
  { year: "1984", text: "Contratos con YPF en Río Gallegos y luego Río Grande." },
  { year: "1991", text: "Finaliza la incursión patagónica." },
  { year: "2003", text: "Líneas 504, 506 y 505." },
  { year: "2004", text: "Permiso de la línea 227 Conesa-Pergamino." },
  { year: "2005", text: "Certificación ISO 9001/2000." },
  { year: "2007", text: "Línea 342 San Nicolás-Ramallo-San Pedro." },
  { year: "2010", text: "Adopción del sistema Mi Boleto." },
  { year: "2011", text: "Servicio local en San Pedro y adjudicación municipal por 21 años en San Nicolás." },
  { year: "2013", text: "Adjudicación de licitación pública en San Pedro." },
  { year: "2014", text: "45 años de vida de la empresa." },
];
