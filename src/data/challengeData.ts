import { MitigationStrategy, RainIntensity, ChallengeResult } from '../types';

export interface StrategyInfo {
  id: MitigationStrategy;
  name: string;
  shortDesc: string;
  mechanism: 'Infiltración' | 'Almacenamiento' | 'Conducción';
  iconType: 'permeable' | 'tank' | 'pipe';
}

export const STRATEGIES: StrategyInfo[] = [
  {
    id: 'pavimento',
    name: 'Pavimento permeable',
    shortDesc: 'Superficie de concreto poroso que permite que el agua pase directamente hacia capas granulares inferiores.',
    mechanism: 'Infiltración',
    iconType: 'permeable',
  },
  {
    id: 'tanque',
    name: 'Tanque de retención subterráneo',
    shortDesc: 'Cámara subterránea de almacenamiento temporal que retiene el agua de lluvia y la suelta gradualmente.',
    mechanism: 'Almacenamiento',
    iconType: 'tank',
  },
  {
    id: 'drenaje',
    name: 'Ampliar tuberías del drenaje',
    shortDesc: 'Aumentar el diámetro del colector pluvial para conducir más agua rápidamente hacia el río.',
    mechanism: 'Conducción',
    iconType: 'pipe',
  },
];

export const CHALLENGE_MATRIX: Record<RainIntensity, Record<MitigationStrategy, ChallengeResult>> = {
  moderada: {
    pavimento: {
      title: 'Menos agua corre por la calle',
      outcomeType: 'optimo',
      benefit: 'El pavimento deja pasar parte de la lluvia hacia las capas inferiores y reduce el encharcamiento en este escenario.',
      limitation: 'Su efecto depende del suelo, del espacio para almacenar agua y de que los poros estén limpios.',
      explanation5to: 'Imagina una esponja bajo la banqueta. Mientras tenga espacio, puede recibir parte del agua que cae.',
      explanation6to: 'La infiltración y el almacenamiento temporal reducen el escurrimiento. El efecto cambia si el suelo ya estaba húmedo.',
      waterLevelPct: 10,
    },
    tanque: {
      title: 'El tanque guarda agua para soltarla después',
      outcomeType: 'optimo',
      benefit: 'En este escenario, el tanque almacena parte de la lluvia y la devuelve al drenaje gradualmente.',
      limitation: 'Requiere espacio, mantenimiento y una salida compatible con la red que recibe el agua.',
      explanation5to: 'Funciona como una tina bajo el parque. Guarda agua durante la lluvia y la suelta poco a poco.',
      explanation6to: 'El almacenamiento temporal y la descarga controlada reducen el caudal pico, el mayor volumen de agua por unidad de tiempo.',
      waterLevelPct: 15,
    },
    drenaje: {
      title: 'La calle se desagua con mayor rapidez',
      outcomeType: 'parcial',
      benefit: 'Una tubería con mayor capacidad puede reducir el agua acumulada en la calle.',
      limitation: 'El agua llega más rápido al siguiente tramo. Hay que revisar si el sistema receptor puede admitirla.',
      explanation5to: 'Un conducto más amplio deja pasar más agua. La pregunta es si hay espacio suficiente adonde desemboca.',
      explanation6to: 'Aumenta la capacidad de conducción local. El caudal pico aguas abajo depende de las demás descargas y de la capacidad del receptor.',
      waterLevelPct: 20,
    },
  },
  intensa: {
    pavimento: {
      title: 'El suelo se satura y queda agua en superficie',
      outcomeType: 'parcial',
      benefit: 'Las capas inferiores reciben parte de la lluvia y pueden retrasar el escurrimiento.',
      limitation: 'Cuando se llenan los poros disponibles, el agua excedente corre por la calle.',
      explanation5to: 'Una esponja mojada recibe menos agua. Si la lluvia sigue, se forman charcos aunque el pavimento tenga poros.',
      explanation6to: 'Si la lluvia supera la capacidad de infiltración y se agota el almacenamiento bajo el pavimento, aumenta el escurrimiento superficial.',
      waterLevelPct: 45,
    },
    tanque: {
      title: 'Se reduce el pico y queda un riesgo de rebose',
      outcomeType: 'parcial',
      benefit: 'El tanque guarda parte del agua que llega durante el momento más intenso de la lluvia.',
      limitation: 'Si el tanque se llena antes de que termine la lluvia, el excedente requiere una salida segura.',
      explanation5to: 'La tina gana tiempo. Si se llena, el agua que sigue llegando tiene que salir por otro camino.',
      explanation6to: 'La descarga controlada puede reducir el caudal pico. La duración de la tormenta y el volumen disponible determinan cuándo puede empezar el rebose.',
      waterLevelPct: 25,
    },
    drenaje: {
      title: 'El agua sale de la calle y presiona al receptor',
      outcomeType: 'al-limite',
      benefit: 'El drenaje ampliado puede aliviar la acumulación en el tramo intervenido.',
      limitation: 'Si el río o el canal ya lleva mucha agua, una descarga adicional puede elevar el riesgo de desbordamiento aguas abajo.',
      explanation5to: 'Sacar el agua de tu calle ayuda ahí. También necesitas saber si la colonia que está junto al canal puede recibirla sin inundarse.',
      explanation6to: 'Una mayor capacidad local no garantiza una menor inundación en la cuenca. Importa cuándo coinciden las descargas y cuánto puede conducir el receptor.',
      waterLevelPct: 60,
    },
  },
};

export interface MeasurementOption {
  id: string;
  label: string;
  variable: string;
  isImportant: boolean;
  feedback: string;
}

export const MEASUREMENT_OPTIONS: MeasurementOption[] = [
  {
    id: 'suelo',
    label: 'Tipo de suelo y permeabilidad',
    variable: 'Conductividad hidráulica (K) y capacidad de infiltración',
    isImportant: true,
    feedback:
      'Fundamental para saber si el pavimento permeable funcionará o si una arcilla impermeable bloqueará el paso del agua.',
  },
  {
    id: 'topografia',
    label: 'Topografía y pendiente de la cuenca',
    variable: 'Pendiente media (S) y curvas de nivel',
    isImportant: true,
    feedback:
      'Determina la velocidad del escurrimiento superficial, la dirección natural del agua y hacia qué puntos bajos convergerán las inundaciones.',
  },
  {
    id: 'lluvia',
    label: 'Historial de lluvias y periodo de retorno',
    variable: 'Curvas Intensidad-Duración-Frecuencia (IDF)',
    isImportant: true,
    feedback:
      'Ayuda a estimar qué intensidades de lluvia son probables para distintas duraciones.',
  },
  {
    id: 'espacio',
    label: 'Espacio e instalaciones subterráneas',
    variable: 'Interferencias con tuberías de gas, agua potable, drenaje sanitario y cableado',
    isImportant: true,
    feedback:
      'Imprescindible antes de excavar un tanque de retención para evitar romper servicios existentes o afectar cimentaciones colindantes.',
  },
];
