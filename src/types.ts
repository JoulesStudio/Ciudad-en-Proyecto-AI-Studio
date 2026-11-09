export type GradeLevel = '5' | '6';

export interface AreaData {
  id: string;
  number: string;
  title: string;
  tagline: string;
  badge: string;
  hotspot: {
    x: number; // Porcentaje en maqueta
    y: number;
    label: string;
  };
  problemExample: {
    title: string;
    description: string;
    isHypothetical: boolean;
  };
  dayInTheLife: {
    activity: string;
    environments: ('Modelado computacional' | 'Laboratorio' | 'Supervisión en campo' | 'Consultoría' | 'Sector público')[];
  };
  relatedCourse: {
    name: string;
    semester: string;
    description: string;
  };
  careerPath: {
    entryRole: string;
    seniorGrowth: string;
    sectors: string;
  };
}

export type RainIntensity = 'moderada' | 'intensa';
export type MitigationStrategy = 'pavimento' | 'tanque' | 'drenaje';

export interface ChallengeResult {
  title: string;
  outcomeType: 'optimo' | 'parcial' | 'al-limite';
  benefit: string;
  limitation: string;
  explanation5to: string;
  explanation6to: string;
  waterLevelPct: number; // 0 to 100
}

export interface ScenarioComparison {
  id: 'centro' | 'estacion';
  name: string;
  context: string;
  civil: {
    roleQuestion: string;
    keyDecisions: string[];
    deliverables: string[];
  };
  architecture: {
    roleQuestion: string;
    keyDecisions: string[];
    deliverables: string[];
  };
  teamwork: {
    tradeOff: string;
    sharedFocus: string[];
  };
}
