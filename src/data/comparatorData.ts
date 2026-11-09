import { ScenarioComparison } from '../types';

export const COMPARATOR_SCENARIOS: ScenarioComparison[] = [
  {
    "id": "centro",
    "name": "Centro comunitario",
    "context": "Un barrio quiere abrir un centro con biblioteca, talleres y un salón de usos múltiples. El terreno está en pendiente y el salón necesita espacio libre para cambiar de uso.",
    "civil": {
      "roleQuestion": "¿Qué debe soportar el edificio y cómo evitamos que se acumule agua alrededor?",
      "keyDecisions": [
        "Estudiar el suelo y comparar formas de cimentar el edificio.",
        "Calcular cómo responde la estructura al peso, al viento y a un sismo.",
        "Planear por dónde sale el agua de lluvia."
      ],
      "deliverables": [
        "Memoria de cálculo con los supuestos del análisis.",
        "Planos de cimentación, estructura y drenaje."
      ]
    },
    "architecture": {
      "roleQuestion": "¿Cómo hacemos que el centro se sienta abierto y sea fácil de usar para el barrio?",
      "keyDecisions": [
        "Organizar los talleres, la biblioteca y los espacios de convivencia.",
        "Aprovechar la luz natural y orientar entradas y recorridos.",
        "Conectar el acceso con la calle para que distintas personas puedan llegar y moverse por el edificio."
      ],
      "deliverables": [
        "Plantas, cortes y modelos del espacio.",
        "Planos de recorridos, accesos y acabados."
      ]
    },
    "teamwork": {
      "tradeOff": "Un salón sin columnas al centro permite más actividades. El equipo compara cómo distintas cubiertas afectarían la altura, el costo, los materiales y la iluminación del espacio.",
      "sharedFocus": [
        "Accesibilidad y salidas seguras.",
        "Materiales durables y de bajo mantenimiento.",
        "Coordinación de estructura, instalaciones y espacios."
      ]
    }
  },
  {
    "id": "estacion",
    "name": "Estación de transporte",
    "context": "Una estación conecta autobuses, bicicletas y recorridos peatonales. Necesita andenes que protejan de la lluvia y den espacio suficiente para moverse en horas de mayor demanda.",
    "civil": {
      "roleQuestion": "¿Cómo soportar la circulación de autobuses y mantener los andenes protegidos del agua?",
      "keyDecisions": [
        "Analizar los giros y las rutas de los autobuses.",
        "Estudiar cargas del pavimento y diseñar los apoyos de la cubierta.",
        "Evaluar pendientes y salidas para conducir la lluvia."
      ],
      "deliverables": [
        "Planos de circulación vehicular, pavimento y estructura.",
        "Planos de drenaje y memoria de cálculo."
      ]
    },
    "architecture": {
      "roleQuestion": "¿Cómo lograr que las personas encuentren su ruta y esperen con comodidad?",
      "keyDecisions": [
        "Organizar andenes, entradas y conexiones peatonales.",
        "Diseñar señalización, iluminación y zonas de espera.",
        "Ubicar el mobiliario y los servicios sin interrumpir los recorridos."
      ],
      "deliverables": [
        "Plantas de andenes y secciones de la cubierta.",
        "Esquemas de recorrido, mobiliario y señalización."
      ]
    },
    "teamwork": {
      "tradeOff": "Una cubierta más amplia protege de la lluvia. Los apoyos también deben dejar libre el paso y las líneas de visión. Ambos equipos estudian dónde colocarlos y cómo mantener la cubierta.",
      "sharedFocus": [
        "Accesos cómodos desde la banqueta hasta el autobús.",
        "Recorridos seguros y fáciles de entender.",
        "Materiales resistentes al uso frecuente y manejo de la lluvia."
      ]
    }
  }
];
