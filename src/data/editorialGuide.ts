import { GradeLevel } from '../types';

export interface GuideTopic {
  id: 'matematicas' | 'campo' | 'diferencias' | 'campus';
  question: string;
  shortLabel: string;
  responses: Record<GradeLevel, string>;
}

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: 'matematicas',
    question: '¿Cómo se usan las matemáticas?',
    shortLabel: 'Uso de matemáticas',
    responses: {
      '5': `En Ingeniería Civil no haces matemáticas abstractas desconectadas del mundo real. Cada cálculo tiene un significado físico concreto:

• Álgebra y geometría: sirven para calcular volúmenes de concreto, pendientes de calles para que el agua no se estanque y ángulos de armaduras en techumbres.
• Trigonometría: es la base de la topografía; con ella mides con precisión milimétrica la altura de montañas, la curvatura de puentes y los límites exactos de los predios.
• Cálculo (derivadas e integrales): te ayuda a conocer dónde se dobla más una viga cuando pasan camiones pesados y a predecir cuántos litros de agua caerán en una tormenta durante 30 minutos.
• Estadística: se utiliza para analizar 50 años de lluvias y sismos históricos para diseñar obras que resistan los eventos más extremos.

En resumen: las matemáticas son el lenguaje con el que garantizas que un puente soporte a miles de personas sin colapsar.`,
      '6': `En Área 1 ya conoces cálculo diferencial, integral y física mecánica. En Ingeniería Civil llevas esos principios a su aplicación profesional directa:

• Ecuaciones diferenciales y cálculo multivariable: modelan la disipación del calor en colados masivos de presas, la tasa de consolidación de estratos arcillosos en suelos y el flujo no permanente en canales abiertos (ecuaciones de Saint-Venant).
• Álgebra lineal y matrices: son el corazón del Método de Rigideces y el análisis por Elementos Finitos (FEM). Cada nudo de un rascacielos se resuelve mediante sistemas de matrices $[K] \\{u\\} = \\{F\\}$ para determinar desplazamientos y fuerzas internas ante sismos.
• Probabilidad y estadística de extremos: cálculo del Periodo de Retorno ($T_r$) mediante distribuciones de Gumbel para gastos hidráulicos máximos y espectros de diseño sísmico de la Norma Técnica Complementaria.
• Mecánica vectorial y del medio continuo: equilibrio estático $\\Sigma F = 0, \\Sigma M = 0$, cálculo de esfuerzos normales ($\\sigma$) y cortantes ($\\tau$), círculos de Mohr y deformaciones unitarias en materiales elásticos y plásticos.`,
    },
  },
  {
    id: 'campo',
    question: '¿En qué podría trabajar?',
    shortLabel: 'Campo laboral',
    responses: {
      '5': `El campo de la Ingeniería Civil es mucho más amplio que solo "construir casas". Los egresados trabajan en sectores estratégicos:

1. Empresas constructoras y desarrolladoras: dirigiendo la ejecución en sitio de rascacielos, centros comerciales, hospitales o fraccionamientos residenciales.
2. Despachos de cálculo y diseño: trabajando frente a computadoras de alta gama con programas 3D calculando puentes, cúpulas, naves industriales y túneles.
3. Infraestructura hidráulica y ambiental: en organismos de agua potable, presas, plantas potabilizadoras y sistemas de drenaje sustentable para proteger ciudades.
4. Vías terrestres y movilidad: planificando sistemas de trenes, autopistas, pistas de aeropuertos y rutas de transporte masivo.
5. Emprendimiento propio: fundando despachos de supervisión, laboratorios de control de calidad de materiales o empresas de movimiento de tierras y maquinaria.`,
      '6': `La proyección profesional de un Ingeniero Civil combina especialización técnica y alta dirección ejecutiva:

• Consultoría de Estructuras y Sismo: modelado BIM estructural avanzado, diseño de aisladores de base elastoméricos y peritajes de seguridad estructural para obras complejas.
• Geotecnia y Cimentaciones Especiales: diseño de muros Milán, tablestacados, anclajes postensados y mecánica de rocas para túneles y minería.
• Gerencia de Proyectos (Project Management): control presupuestal bajo metodología PMI/BIM, cálculo de rendimientos, ruta crítica (CPM) y gestión contractual pública/privada.
• Concesionarias y Sector Público: dirección técnica en concesiones de autopistas de cuota, puertos marítimos, aeropuertos (OACI), Secretaría de Infraestructura, Comunicaciones y Transportes (SICT) y CONAGUA.
• Dirección de Empresas y Finanzas Inmobiliarias: evaluación de viabilidad técnico-financiera de macroproyectos de infraestructura en fondos de inversión.`,
    },
  },
  {
    id: 'diferencias',
    question: '¿Qué diferencia hay con Arquitectura?',
    shortLabel: 'Civil vs Arquitectura',
    responses: {
      '5': `La forma más sencilla de entenderlo es cómo se complementan para que una obra exista:

• Arquitectura se enfoca en el espacio humano: cómo se vive el lugar, la distribución de recámaras o salones, el aprovechamiento de la luz solar, la estética de las fachadas y la relación de la obra con las personas y la ciudad.
• Ingeniería Civil se enfoca en la física y la constructibilidad: calcula con exactitud cuánto peso resistirá cada columna, cómo cimentar en suelos difíciles, cómo desalojar el agua de lluvia, qué tuberías y materiales usar y cómo coordinar la maquinaria y trabajadores en obra.

No son rivales: son socios indispensables. El arquitecto imagina y distribuye el espacio; el ingeniero civil calcula la estructura y el sistema para que sea seguro, eficiente y real.`,
      '6': `Ambas disciplinas comparten el hábitat humano, pero sus métodos y responsabilidades legales difieren claramente:

• Arquitectura (Diseño y Programa Espacial): responde a "¿cómo debe vivirse y funcionar este espacio?". Define zonificación, modulación estética, recorridos peatonales, confort higrotérmico y bioclimático, y entrega planos arquitectónicos y de cancelería/acabados.
• Ingeniería Civil (Mecánica y Viabilidad Físico-Financiera): responde a "¿cómo resiste las fuerzas de la naturaleza y cómo se ejecuta?". Realiza el modelado estático y dinámico por sismo, la mecánica de suelos para la cimentación, la física hidráulica de instalaciones y la planeación constructiva (costos, ruta crítica, seguridad estructural).
• Responsabilidad legal: en México, el Ingeniero Civil firma como Corresponsable en Seguridad Estructural (CSE) o Director Responsable de Obra (DRO), asumiendo la garantía técnica del comportamiento físico de la edificación.`,
    },
  },
  {
    id: 'campus',
    question: '¿Qué haría en Anáhuac?',
    shortLabel: 'Experiencia Anáhuac',
    responses: {
      '5': `En Universidad Anáhuac México · Campus Norte estudiarás un plan de 9 semestres diseñado para prepararte tanto en lo técnico como en el liderazgo:

• Laboratorios prácticos desde los primeros semestres: ensayarás probetas de concreto en prensas hidráulicas para medir su resistencia y verás el comportamiento del agua en canales de acrílico en el Laboratorio de Hidráulica.
• Prácticas de campo con equipo real: saldrás con estaciones totales, niveles y tecnología GPS/drones para realizar levantamientos topográficos en el terreno.
• Visitas guiadas a megaobras: conocerás obras civiles en proceso constructivo en la Ciudad de México y área metropolitana con directores de proyecto.
• Formación ética y de liderazgo: aprenderás a gestionar empresas y tomar decisiones que cuiden la vida de las personas y el medio ambiente.`,
      '6': `El plan de estudios de Ingeniería Civil en Campus Norte (9 semestres) se fundamenta en cinco áreas troncales y una formación empresarial integral:

• Áreas formativas troncales: Estructuras, Hidráulica y Sanitaria, Geotecnia y Cimentaciones, Vías de Comunicación y Transporte, y Construcción y Administración.
• Infraestructura de vanguardia: Laboratorio de Materiales I y II con marco de pruebas a escala, Laboratorio de Mecánica de Suelos con cámaras triaxiales y permeámetros, y Laboratorio de Mecánica de Fluidos con canales hidrodinámicos de pendiente variable.
• Vinculación con la industria: cátedras corporativas con directivos de las principales firmas de consultoría, concesionarias y empresas de construcción del país.
• Enfoque de Liderazgo Anáhuac: formación en dirección de negocios, normatividad técnica nacional e internacional (NTC-CDMX, ACI, AASHTO) y compromiso con la responsabilidad social y la sostenibilidad.`,
    },
  },
];
