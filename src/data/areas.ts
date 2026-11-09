import { AreaData } from '../types';

export const AREAS_DATA: AreaData[] = [
  {
    id: 'estructuras',
    number: '01',
    title: 'Estructuras',
    tagline: 'Fuerza, estabilidad y resistencia ante sismos y viento',
    badge: 'Cargas y Esfuerzos',
    hotspot: {
      x: 32,
      y: 34,
      label: 'Torre de marcos estructurales y puente atirantado',
    },
    problemExample: {
      title: '¿Cómo responde un edificio durante un sismo?',
      description:
        'En un predio con aceleraciones sísmicas considerables, se debe calcular la rigidez de columnas de concreto de alta resistencia y disipadores de energía de acero para que el edificio tolere oscilaciones severas sin colapso.',
      isHypothetical: true,
    },
    dayInTheLife: {
      activity:
        'Por la mañana corre un análisis tridimensional de elementos finitos para verificar derivas de piso ante sismo; al mediodía revisa con el equipo de obra el armado de acero en trabes principales.',
      environments: ['Modelado computacional', 'Supervisión en campo', 'Consultoría'],
    },
    relatedCourse: {
      name: 'Diseño estructural',
      semester: 'Semestre 6',
      description:
        'Cálculo de elementos de concreto reforzado y perfiles estructurales de acero, combinaciones de carga y normas técnicas de diseño por sismo.',
    },
    careerPath: {
      entryRole: 'Ingeniero calculista junior / Modelador BIM estructural',
      seniorGrowth: 'Director de peritajes y proyectos estructurales / Consultor senior',
      sectors: 'Despachos de ingeniería de cálculo, constructoras corporativas y peritaje forense.',
    },
  },
  {
    id: 'hidraulica',
    number: '02',
    title: 'Agua e Hidráulica',
    tagline: 'Manejo de cuencas, redes potables y protección contra inundaciones',
    badge: 'Dinámica de Fluidos',
    hotspot: {
      x: 62,
      y: 68,
      label: 'Río urbano canalizado y colector pluvial',
    },
    problemExample: {
      title: '¿Cómo reducir los encharcamientos de una colonia?',
      description:
        'Durante lluvias extraordinarias, el escurrimiento de la ladera satura el drenaje convencional. Se diseña una red de colectores combinada con un vaso regulador para amortiguar el caudal pico antes de verter al río.',
      isHypothetical: true,
    },
    dayInTheLife: {
      activity:
        'Simula en software hidrológico el gasto de diseño para un periodo de retorno de 50 años; después visita el río para aforar gastos y calibrar la cota del canal de descarga.',
      environments: ['Modelado computacional', 'Supervisión en campo', 'Sector público'],
    },
    relatedCourse: {
      name: 'Mecánica de fluidos',
      semester: 'Semestre 5',
      description:
        'Principios de hidrostática, flujo en conductos a presión y canales abiertos, hidrología superficial y diseño de redes de agua y drenaje.',
    },
    careerPath: {
      entryRole: 'Analista de redes hidráulicas / Asistente de proyectos pluviales',
      seniorGrowth: 'Coordinador de infraestructura hídrica / Asesor de cuencas y presas',
      sectors: 'Organismos operadores de agua potable, consultoría ambiental y Comisión Nacional del Agua.',
    },
  },
  {
    id: 'movilidad',
    number: '03',
    title: 'Movilidad y Transporte',
    tagline: 'Planificación de vialidades, tránsito, pavimentos y transporte masivo',
    badge: 'Flujos y Capacidad',
    hotspot: {
      x: 72,
      y: 42,
      label: 'Intersección vial y viaducto elevado',
    },
    problemExample: {
      title: '¿Cómo mover a más personas en una avenida saturada?',
      description:
        'Un cruce de cuatro avenidas principales presenta demoras críticas y congestión. Se evalúa el aforo vehicular, diseño geométrico de carriles exclusivos y el cálculo del paquete estructural del pavimento de concreto hidráulico para soportar autobuses de 25 toneladas.',
      isHypothetical: true,
    },
    dayInTheLife: {
      activity:
        'Analiza matrices de origen-destino y tiempos de ciclo de semáforos en software de microsimulación; supervisa en sitio la prueba de deflexión con viga Benkelman en la calzada recién tendida.',
      environments: ['Modelado computacional', 'Supervisión en campo', 'Sector público'],
    },
    relatedCourse: {
      name: 'Sistemas de transporte',
      semester: 'Semestre 8',
      description:
        'Relaciona la demanda de viajes con la capacidad y el funcionamiento del transporte.',
    },
    careerPath: {
      entryRole: 'Especialista en aforos viales / Proyectista geométrico de caminos',
      seniorGrowth: 'Director de sistemas integrados de transporte / Consultor de infraestructura metropolitana',
      sectors: 'Secretarías de movilidad, empresas concesionarias de autopistas y despachos de tránsito.',
    },
  },
  {
    id: 'geotecnia',
    number: '04',
    title: 'Suelos y Geotecnia',
    tagline: 'Mecánica de suelos, cimentaciones profundas y estabilidad de taludes',
    badge: 'Mecánica de Rocas y Suelos',
    hotspot: {
      x: 22,
      y: 65,
      label: 'Talud de corte y cimentación profunda por pilotes',
    },
    problemExample: {
      title: '¿Qué pasa si construimos sobre suelo blando?',
      description:
        'Para desplantar un edificio pesado sobre un estrato blando de 30 metros de espesor con nivel freático alto, se calculan pilotes colados en sitio para transferir las cargas a estratos duros sin asentamientos diferenciales.',
      isHypothetical: true,
    },
    dayInTheLife: {
      activity:
        'Interpreta sondeos de penetración estándar (SPT) y pruebas triaxiales en el laboratorio de mecánica de suelos; luego verifica en campo la perforación e inyección de concreto en los pilotes.',
      environments: ['Laboratorio', 'Supervisión en campo', 'Consultoría'],
    },
    relatedCourse: {
      name: 'Geotecnia',
      semester: 'Semestre 4',
      description:
        'Propiedades índice de los suelos, consolidación, esfuerzo cortante, capacidad de carga admisible, empujes de tierras y diseño de cimentaciones.',
    },
    careerPath: {
      entryRole: 'Ingeniero de laboratorio de suelos / Supervisor geotécnico',
      seniorGrowth: 'Especialista geotécnico senior / Perito de mecánica de suelos',
      sectors: 'Laboratorios de control de calidad, constructoras de túneles y cimentaciones especiales.',
    },
  },
  {
    id: 'construccion',
    number: '05',
    title: 'Construcción y Gestión',
    tagline: 'Administración de megaobras, presupuestos, rendimientos y seguridad',
    badge: 'Gestión y Obra',
    hotspot: {
      x: 48,
      y: 20,
      label: 'Zona de obra activa con grúa torre y colado de losas',
    },
    problemExample: {
      title: '¿Cómo se coordina una obra con muchas tareas a la vez?',
      description:
        'Coordinar la llegada simultánea de 40 camiones revolvedores de concreto premezclado, pruebas de revenimiento al pie de bomba y montaje de cimbras para cumplir un plazo contractual estricto sin sobrecostos.',
      isHypothetical: true,
    },
    dayInTheLife: {
      activity:
        'Arranca la junta de seguridad con los frentes de trabajo; revisa bitácora electrónica de obra, programa de suministros con proveedores y valida la estimación financiera quincenal.',
      environments: ['Supervisión en campo', 'Consultoría', 'Sector público'],
    },
    relatedCourse: {
      name: 'Prácticum: Administración de la construcción',
      semester: 'Semestre 7',
      description:
        'Conecta la planeación, los recursos y la coordinación de equipos en una obra.',
    },
    careerPath: {
      entryRole: 'Residente auxiliar de obra / Coordinador de compras y estimaciones',
      seniorGrowth: 'Gerente de construcción / Director corporativo de proyectos inmobiliarios',
      sectors: 'Empresas desarrolladoras, firmas constructoras e interventorías de supervisión técnica.',
    },
  },
  {
    id: 'sostenibilidad',
    number: '06',
    title: 'Infraestructura Sostenible',
    tagline: 'Enfoque transversal: resiliencia climática, techos vivos y ciclo de vida',
    badge: 'Enfoque Transversal',
    hotspot: {
      x: 45,
      y: 48,
      label: 'Techos vivos, captación pluvial y materiales de baja huella de carbono',
    },
    problemExample: {
      title: '¿Puede una calle absorber parte de la lluvia?',
      description:
        'Una calle se encharca después de cada lluvia. El equipo compara jardines que retienen agua y pavimentos que dejan pasar parte de la lluvia.',
      isHypothetical: true,
    },
    dayInTheLife: {
      activity:
        'Calcula el balance hídrico del proyecto incorporando áreas permeables; evalúa la huella de carbono de concretos con adiciones minerales recicladas frente al cemento Portland tradicional.',
      environments: ['Modelado computacional', 'Consultoría', 'Laboratorio'],
    },
    relatedCourse: {
      name: 'Construcción y desarrollo sustentable',
      semester: 'Semestre 6',
      description:
        'Durabilidad de materiales, descarbonización de la construcción, normatividad ambiental y diseño adaptativo ante cambio climático.',
    },
    careerPath: {
      entryRole: 'Consultor junior en certificación de proyectos sostenibles (LEED / EDGE)',
      seniorGrowth: 'Director de sustentabilidad y resiliencia urbana / Asesor de infraestructura verde',
      sectors: 'Despachos de ingeniería bioclimática, organismos multilaterales y desarrolladores sustentables.',
    },
  },
];
