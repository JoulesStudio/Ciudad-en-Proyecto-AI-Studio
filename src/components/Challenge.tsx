import React, { useState } from 'react';
import {
  CloudRain,
  CloudLightning,
  RefreshCw,
  GitCompare,
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  Droplets,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { GradeLevel, MitigationStrategy, RainIntensity } from '../types';
import {
  CHALLENGE_MATRIX,
  MEASUREMENT_OPTIONS,
  STRATEGIES,
} from '../data/challengeData';

interface ChallengeProps {
  grade: GradeLevel;
}

export const Challenge: React.FC<ChallengeProps> = ({ grade }) => {
  const [intensity, setIntensity] = useState<RainIntensity>('moderada');
  const [strategy, setStrategy] = useState<MitigationStrategy>('tanque');
  const [isSimulated, setIsSimulated] = useState<boolean>(true);
  const [selectedMeasurement, setSelectedMeasurement] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [comparisonStrategy, setComparisonStrategy] = useState<MitigationStrategy>('pavimento');

  const currentResult = CHALLENGE_MATRIX[intensity][strategy];
  const compareResult = CHALLENGE_MATRIX[intensity][comparisonStrategy];

  const handleReset = () => {
    setIntensity('moderada');
    setStrategy('tanque');
    setIsSimulated(true);
    setSelectedMeasurement(null);
    setCompareMode(false);
  };

  return (
    <section id="reto" className="py-16 bg-white border-b border-[#191716]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Encabezado */}
        <div className="space-y-3 max-w-3xl">
          <span className="font-mono-tech text-xs tracking-wider uppercase text-[#FF5900] font-bold">
            02 · RETO VOCACIONAL
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191716] tracking-tight">
            ¿A dónde va el agua cuando llueve?
          </h2>
          <p className="text-sm sm:text-base text-[#191716]/75">
            Una colonia construida en una hondonada sufre por escurrimientos pluviales. Modifica la intensidad de la tormenta,
            elige una estrategia de mitigación y compara las ventajas y límites de cada solución en un escenario ilustrativo.
          </p>
        </div>

        {/* Panel de Controles: Intensidad y Estrategia */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 rounded-2xl bg-[#FAF8F3] border border-[#191716]/10">
          {/* Selector de Tormenta */}
          <div className="md:col-span-5 space-y-3">
            <label className="block text-xs font-mono-tech uppercase font-bold text-[#191716]/70">
              Paso 1: Intensidad de la lluvia
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIntensity('moderada')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-xs sm:text-sm font-bold transition-all min-h-[44px] cursor-pointer ${
                  intensity === 'moderada'
                    ? 'bg-white border-[#2A7F85] text-[#246D73] shadow-xs ring-1 ring-[#2A7F85]'
                    : 'bg-white/60 border-[#191716]/15 text-[#191716]/70 hover:bg-white'
                }`}
                aria-pressed={intensity === 'moderada'}
              >
                <CloudRain className="w-4 h-4 text-[#2A7F85]" />
                <span>Tormenta moderada</span>
              </button>
              <button
                type="button"
                onClick={() => setIntensity('intensa')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-xs sm:text-sm font-bold transition-all min-h-[44px] cursor-pointer ${
                  intensity === 'intensa'
                    ? 'bg-[#191716] border-[#191716] text-[#FAF8F3] shadow-xs'
                    : 'bg-white/60 border-[#191716]/15 text-[#191716]/70 hover:bg-white'
                }`}
                aria-pressed={intensity === 'intensa'}
              >
                <CloudLightning className="w-4 h-4 text-[#FF5900]" />
                <span>Tormenta intensa</span>
              </button>
            </div>
            <p className="text-[11px] text-[#191716]/60">
              {intensity === 'moderada'
                ? 'En este escenario el suelo todavía puede recibir parte de la lluvia.'
                : 'Llega mucha agua en poco tiempo y el suelo puede saturarse.'}
            </p>
          </div>

          {/* Selector de Solución de Ingeniería */}
          <div className="md:col-span-7 space-y-3">
            <label className="block text-xs font-mono-tech uppercase font-bold text-[#191716]/70">
              Paso 2: Estrategia de Ingeniería Civil
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {STRATEGIES.map((strat) => {
                const isSelected = strategy === strat.id;
                return (
                  <button
                    key={strat.id}
                    type="button"
                    onClick={() => {
                      setStrategy(strat.id);
                      setIsSimulated(true);
                    }}
                    className={`flex flex-col text-left p-3 rounded-xl border transition-all min-h-[76px] justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#FF5900] ring-1 ring-[#FF5900] shadow-xs'
                        : 'bg-white/60 border-[#191716]/15 text-[#191716]/80 hover:bg-white'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-xs text-[#191716]">
                        {strat.name}
                      </span>
                    </div>
                    <span className="font-mono-tech text-[10px] text-[#FF5900] font-semibold">
                      {strat.mechanism}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Visualizador de la Simulación en SVG */}
        <div className="relative w-full rounded-2xl border border-[#191716]/15 bg-[#FAF8F3] overflow-hidden p-4 sm:p-6 shadow-xs">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-xs font-bold text-[#FF5900] uppercase">
                VISTA DE CORTE HIDROLÓGICO
              </span>
              <span className="text-[#191716]/40">·</span>
              <span className="text-xs text-[#191716]/70">
                Lluvia {intensity} + {STRATEGIES.find((s) => s.id === strategy)?.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCompareMode(!compareMode)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  compareMode
                    ? 'bg-[#191716] text-[#FAF8F3] border-[#191716]'
                    : 'bg-white text-[#191716] border-[#191716]/20 hover:border-[#191716]'
                }`}
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>{compareMode ? 'Ocultar comparativa' : 'Comparar opciones'}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-lg text-xs font-semibold bg-white text-[#191716] border border-[#191716]/20 hover:border-[#191716] cursor-pointer"
                title="Reiniciar a valores iniciales"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>

          {/* SVG Dinámico del Reto */}
          <div className="w-full bg-[#EFECE6] rounded-xl border border-[#191716]/10 overflow-hidden relative">
            <svg viewBox="0 0 800 320" className="w-full h-auto block select-none">
              <defs>
                {/* Gotas de lluvia animadas */}
                <pattern
                  id="rainPattern"
                  width={intensity === 'intensa' ? '18' : '32'}
                  height="36"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="4"
                    y1="2"
                    x2="2"
                    y2={intensity === 'intensa' ? '24' : '14'}
                    stroke="#2A7F85"
                    strokeWidth={intensity === 'intensa' ? '1.8' : '1.2'}
                    strokeOpacity={intensity === 'intensa' ? '0.85' : '0.6'}
                  />
                  {intensity === 'intensa' && (
                    <line x1="12" y1="14" x2="10" y2="34" stroke="#2A7F85" strokeWidth="1.6" strokeOpacity="0.75" />
                  )}
                </pattern>
              </defs>

              {/* Cielo y lluvia sobre la colonia */}
              <rect x="0" y="0" width="800" height="150" fill="#E5DFD5" />
              <rect x="0" y="0" width="800" height="150" fill="url(#rainPattern)" />

              {/* Terreno con pendiente hacia la derecha (hondonada y río) */}
              {/* Estrato de roca y subsuelo profundo */}
              <polygon points="0,170 800,210 800,320 0,320" fill="#4A3423" />
              {/* Estrato intermedio de suelo arcillo-arenoso */}
              <polygon points="0,150 800,190 800,230 0,200" fill="#6B4B34" />
              {/* Capa de rasante / calle pavimentada */}
              <polygon points="0,140 800,180 800,195 0,155" fill="#2C2927" stroke="#191716" strokeWidth="1" />

              {/* Casas esquemáticas de la colonia */}
              <g transform="translate(40, 90)">
                <polygon points="0,50 35,50 35,20 0,20" fill="#FAF8F3" stroke="#191716" strokeWidth="1.2" />
                <polygon points="-5,20 17.5,2 40,20" fill="#FF5900" stroke="#191716" strokeWidth="1.2" />
              </g>
              <g transform="translate(100, 95)">
                <polygon points="0,50 40,50 40,15 0,15" fill="#EAE4D8" stroke="#191716" strokeWidth="1.2" />
                <polygon points="-5,15 20,0 45,15" fill="#6B3F23" stroke="#191716" strokeWidth="1.2" />
              </g>
              <g transform="translate(170, 102)">
                <polygon points="0,50 35,50 35,22 0,22" fill="#FAF8F3" stroke="#191716" strokeWidth="1.2" />
                <polygon points="-5,22 17.5,5 40,22" fill="#D94A00" stroke="#191716" strokeWidth="1.2" />
              </g>

              {/* Río / Canal receptor a la derecha */}
              <rect x="670" y="170" width="130" height="150" fill="#246D73" />
              <path
                d="M 670,170 Q 710,165 750,170 T 800,168"
                stroke="#A8E4E7"
                strokeWidth="2"
                fill="none"
              />
              <text x="735" y="240" fill="#FAF8F3" fontSize="12" fontWeight="bold" textAnchor="middle">
                Río receptor
              </text>

              {/* ELEMENTO ILUSTRATIVO SEGÚN LA ESTRATEGIA ELEGIDA */}
              {strategy === 'pavimento' && (
                <g id="illustration-pavimento">
                  {/* Capa porosa sobre la vialidad */}
                  <polygon
                    points="240,152 580,169 580,185 240,168"
                    fill="#D9D2C5"
                    stroke="#FF5900"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <text x="410" y="178" fill="#191716" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Pavimento poroso filtrante
                  </text>
                  {/* Flechas de infiltración hacia el subsuelo */}
                  <g stroke="#2A7F85" strokeWidth="1.5" strokeDasharray="3 3">
                    <line x1="280" y1="188" x2="280" y2="230" />
                    <line x1="360" y1="192" x2="360" y2="240" />
                    <line x1="440" y1="196" x2="440" y2="250" />
                    <line x1="520" y1="200" x2="520" y2="245" />
                  </g>
                </g>
              )}

              {strategy === 'tanque' && (
                <g id="illustration-tanque">
                  {/* Cámara subterránea de almacenamiento */}
                  <rect
                    x="320"
                    y="210"
                    width="200"
                    height="75"
                    rx="6"
                    fill="#191716"
                    stroke="#FF5900"
                    strokeWidth="2"
                  />
                  {/* Nivel de agua almacenada en el tanque */}
                  <rect
                    x="322"
                    y={intensity === 'intensa' ? 225 : 245}
                    width="196"
                    height={intensity === 'intensa' ? 58 : 38}
                    rx="4"
                    fill="#2A7F85"
                  />
                  <text x="420" y="245" fill="#FAF8F3" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Tanque de tormenta
                  </text>
                  <text x="420" y="262" fill="#FAF8F3" fontSize="9" opacity="0.8" textAnchor="middle">
                    {intensity === 'intensa' ? 'Ocupación del tanque: alta' : 'Ocupación del tanque: media'}
                  </text>
                  {/* Conducto de descarga controlada hacia el río */}
                  <rect x="520" y="250" width="150" height="14" fill="#3A3633" stroke="#FAF8F3" strokeWidth="0.8" />
                  <line x1="525" y1="257" x2="665" y2="257" stroke="#76C4C8" strokeWidth="3" strokeDasharray="6 4" />
                </g>
              )}

              {strategy === 'drenaje' && (
                <g id="illustration-drenaje">
                  {/* Colector ampliado de gran diámetro */}
                  <line x1="220" y1="185" x2="670" y2="215" stroke="#191716" strokeWidth="18" strokeLinecap="round" />
                  <line x1="220" y1="185" x2="670" y2="215" stroke="#246D73" strokeWidth="12" strokeDasharray="14 6" />
                  <text x="440" y="200" fill="#FAF8F3" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Colector pluvial reforzado (Ø 1.50 m)
                  </text>
                  {/* Salida masiva al río */}
                  <ellipse cx="675" cy="216" rx="8" ry="12" fill="#76C4C8" />
                </g>
              )}

              {/* Nivel de agua superficial en la calle (charcos / inundación) */}
              <rect
                x="240"
                y="142"
                width="340"
                height={intensity === 'intensa' && strategy === 'drenaje' ? 14 : strategy === 'pavimento' && intensity === 'intensa' ? 10 : 3}
                fill="#2A7F85"
                fillOpacity={strategy === 'tanque' ? 0.3 : 0.8}
              />
            </svg>
          </div>

          {/* Resultado didáctico según Grado Escolar */}
          <div className="mt-6 p-5 rounded-xl bg-white border border-[#191716]/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#191716]/10">
              <div className="flex items-center gap-2">
                {currentResult.outcomeType === 'optimo' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : currentResult.outcomeType === 'parcial' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-[#FF5900]" />
                )}
                <h4 className="font-extrabold text-base text-[#191716]">
                  {currentResult.title}
                </h4>
              </div>

              <div className="font-mono-tech text-xs text-[#191716]/60">
                Explicación para: <strong className="text-[#FF5900]">{grade === '5' ? '5.º de prepa' : '6.º Área 1'}</strong>
              </div>
            </div>

            {/* Explicación según 5.º o 6.º de preparatoria */}
            <div className="p-4 rounded-lg bg-[#FAF8F3] border border-[#191716]/10 text-xs sm:text-sm text-[#191716]/85 leading-relaxed">
              <div className="font-bold text-[#FF5900] mb-1 font-mono-tech uppercase text-[11px]">
                {grade === '5' ? 'Concepto físico cotidiano:' : 'Análisis físico-matemático (Área 1):'}
              </div>
              <p>{grade === '5' ? currentResult.explanation5to : currentResult.explanation6to}</p>
            </div>

            {/* Beneficio concreto y límite real */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Beneficio de la solución:
                </span>
                <p className="text-[#191716]/80">{currentResult.benefit}</p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-[#6B3F23] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#FF5900]" />
                  Límite de diseño real:
                </span>
                <p className="text-[#191716]/80">{currentResult.limitation}</p>
              </div>
            </div>
          </div>

          {/* Comparativa paralela si el usuario la activa */}
          {compareMode && (
            <div className="mt-6 p-5 rounded-xl bg-[#FAF8F3] border-2 border-dashed border-[#FF5900]/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs font-bold text-[#FF5900] uppercase">
                  Comparando contra otra estrategia:
                </span>
                <select
                  value={comparisonStrategy}
                  onChange={(e) => setComparisonStrategy(e.target.value as MitigationStrategy)}
                  className="text-xs font-bold bg-white border border-[#191716]/20 rounded-lg px-2.5 py-1.5"
                >
                  {STRATEGIES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3 bg-white rounded-lg border border-[#191716]/10 space-y-1">
                  <span className="font-bold text-[#191716]">
                    {STRATEGIES.find((s) => s.id === strategy)?.name}
                  </span>
                  <p className="text-[#191716]/75">{currentResult.benefit}</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#191716]/10 space-y-1">
                  <span className="font-bold text-[#191716]">
                    {STRATEGIES.find((s) => s.id === comparisonStrategy)?.name}
                  </span>
                  <p className="text-[#191716]/75">{compareResult.benefit}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pregunta Reflexiva Final Clave */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#191716] text-[#FAF8F3] space-y-6">
          <div className="space-y-1">
            <span className="font-mono-tech text-xs text-[#FF5900] font-bold tracking-wider uppercase">
              PREGUNTA CLAVE DE INGENIERÍA
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              ¿Qué medirías antes de tomar una decisión definitiva?
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF8F3]/75 max-w-2xl">
              Un buen ingeniero no elige una obra por intuición; mide las condiciones del terreno y del clima. Selecciona
              la variable que considerarías prioritaria:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MEASUREMENT_OPTIONS.map((opt) => {
              const isChosen = selectedMeasurement === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedMeasurement(opt.id)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer min-h-[64px] ${
                    isChosen
                      ? 'bg-[#FF5900] border-[#FF5900] text-[#191716] font-bold'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-[#FAF8F3]'
                  }`}
                >
                  <div className="text-sm font-semibold">{opt.label}</div>
                  <div className={`text-[11px] font-mono-tech mt-1 ${isChosen ? 'text-[#191716]' : 'text-[#FAF8F3]/60'}`}>
                    Variable: {opt.variable}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback educativo tras seleccionar */}
          {selectedMeasurement && (
            <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#FF5900]">
                <CheckCircle className="w-4 h-4" />
                <span>Excelente criterio técnico:</span>
              </div>
              <p className="text-[#FAF8F3]/90">
                {MEASUREMENT_OPTIONS.find((o) => o.id === selectedMeasurement)?.feedback}
              </p>
              <p className="text-[11px] text-[#FAF8F3]/60 pt-1 border-t border-white/10">
                En la práctica profesional de Ingeniería Civil no eliges solo una: <strong>se integran todas en conjunto</strong> mediante
                un estudio hidrológico, un modelo topográfico digital y una campaña de sondeos geotécnicos.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
