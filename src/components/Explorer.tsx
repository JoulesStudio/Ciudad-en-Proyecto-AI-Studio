import React from 'react';
import {
  Building2,
  Droplets,
  Navigation,
  Layers,
  HardHat,
  Leaf,
  CheckCircle2,
  Clock,
  BookOpen,
  Briefcase,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { AREAS_DATA } from '../data/areas';
import { AreaData } from '../types';

interface ExplorerProps {
  activeAreaId: string;
  onSelectArea: (id: string) => void;
  viewedAreas: Set<string>;
}

export const Explorer: React.FC<ExplorerProps> = ({
  activeAreaId,
  onSelectArea,
  viewedAreas,
}) => {
  const activeArea = AREAS_DATA.find((a) => a.id === activeAreaId) || AREAS_DATA[0];

  const getAreaIcon = (id: string, className: string = 'w-5 h-5') => {
    switch (id) {
      case 'estructuras':
        return <Building2 className={className} />;
      case 'hidraulica':
        return <Droplets className={className} />;
      case 'movilidad':
        return <Navigation className={className} />;
      case 'geotecnia':
        return <Layers className={className} />;
      case 'construccion':
        return <HardHat className={className} />;
      case 'sostenibilidad':
        return <Leaf className={className} />;
      default:
        return <Building2 className={className} />;
    }
  };

  return (
    <section id="explorar" className="py-16 bg-[#FAF8F3] border-b border-[#191716]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Cabecera de sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono-tech text-xs tracking-wider uppercase text-[#FF5900] font-bold">
              01 · EXPLORADOR DE DISCIPLINAS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191716] tracking-tight">
              Seis frentes donde la Ingeniería Civil transforma una metrópoli
            </h2>
            <p className="text-sm sm:text-base text-[#191716]/75">
              Selecciona una especialidad para conocer cómo se traduce el conocimiento técnico en soluciones
              reales de infraestructura, qué hace un ingeniero en su día a día y qué materias cursarás en Anáhuac.
            </p>
          </div>

          <div className="shrink-0 p-3 bg-white rounded-xl border border-[#191716]/10 font-mono-tech text-xs text-[#191716]/80 flex items-center gap-3">
            <span>Progreso de sesión:</span>
            <div className="flex items-center gap-1">
              {AREAS_DATA.map((area) => (
                <div
                  key={area.id}
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                    viewedAreas.has(area.id)
                      ? 'bg-[#FF5900] text-[#191716]'
                      : 'bg-[#191716]/10 text-[#191716]/40'
                  }`}
                  title={`${area.number} ${area.title}`}
                >
                  {area.number}
                </div>
              ))}
            </div>
            <span className="text-[#FF5900] font-bold">{viewedAreas.size}/6</span>
          </div>
        </div>

        {/* Grid de 6 Tarjetas de Especialidad */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {AREAS_DATA.map((area) => {
            const isActive = activeArea.id === area.id;
            const isViewed = viewedAreas.has(area.id);

            return (
              <button
                key={area.id}
                type="button"
                onClick={() => onSelectArea(area.id)}
                className={`relative flex flex-col text-left p-4 rounded-xl border transition-all duration-150 min-h-[130px] justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FF5900] ${
                  isActive
                    ? 'bg-white border-[#FF5900] ring-1 ring-[#FF5900] shadow-sm'
                    : 'bg-white/80 border-[#191716]/15 hover:border-[#191716]/40 hover:bg-white'
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono-tech text-xs font-bold text-[#191716]/50">
                    {area.number}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-[#FF5900]/15 text-[#FF5900]' : 'text-[#191716]/70'}`}>
                    {getAreaIcon(area.id)}
                  </div>
                </div>

                <div className="space-y-1 mt-2">
                  <h3 className="font-bold text-sm text-[#191716] leading-tight line-clamp-2">
                    {area.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#191716]/60">
                    {isViewed ? (
                      <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Vista
                      </span>
                    ) : (
                      <span>Por explorar</span>
                    )}
                  </div>
                </div>

                {isActive && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FF5900] rotate-45" />
                )}
              </button>
            );
          })}
        </div>

        {/* Panel Detallado de la Especialidad Seleccionada */}
        <div className="bg-white rounded-2xl border border-[#191716]/15 p-6 sm:p-8 shadow-xs space-y-8">
          {/* Cabecera del Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#191716]/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F3] border border-[#191716]/10 flex items-center justify-center text-[#FF5900]">
                {getAreaIcon(activeArea.id, 'w-6 h-6')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-tech text-xs text-[#FF5900] font-bold">
                    ÁREA {activeArea.number}
                  </span>
                  <span className="text-[#191716]/30">·</span>
                  <span className="text-xs font-semibold text-[#191716]/70">
                    {activeArea.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#191716]">
                  {activeArea.title}
                </h3>
              </div>
            </div>

            <div className="text-sm text-[#191716]/70 max-w-md italic sm:text-right">
              "{activeArea.tagline}"
            </div>
          </div>

          {/* Bloques de Contenido en 2 Columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Columna Izquierda: Caso real hipotético & Día típico */}
            <div className="space-y-6">
              {/* Ejemplo de problema real */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech uppercase font-bold text-[#6B3F23]">
                  <AlertCircle className="w-4 h-4 text-[#FF5900]" />
                  <span>Ejemplo de problema real</span>
                  <span className="text-[10px] text-[#191716]/50 font-normal">
                    (Caso hipotético didáctico)
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#191716]/10 space-y-1.5">
                  <h4 className="font-bold text-sm text-[#191716]">
                    {activeArea.problemExample.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#191716]/80 leading-relaxed">
                    {activeArea.problemExample.description}
                  </p>
                </div>
              </div>

              {/* Qué hace un ingeniero civil en un día habitual */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech uppercase font-bold text-[#191716]/80">
                  <Clock className="w-4 h-4 text-[#FF5900]" />
                  <span>Un día típico en este campo</span>
                </div>
                <p className="text-xs sm:text-sm text-[#191716]/85 leading-relaxed">
                  {activeArea.dayInTheLife.activity}
                </p>
                {/* Entornos de trabajo reales */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="text-xs text-[#191716]/60 font-medium">Entornos habituales:</span>
                  {activeArea.dayInTheLife.environments.map((env) => (
                    <span
                      key={env}
                      className="text-xs font-medium text-[#191716] bg-[#FAF8F3] px-2.5 py-1 rounded-md border border-[#191716]/10"
                    >
                      {env}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna Derecha: Materia del plan de estudios & Crecimiento profesional */}
            <div className="space-y-6">
              {/* Materia del plan de estudios oficial Anáhuac */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech uppercase font-bold text-[#FF5900]">
                  <BookOpen className="w-4 h-4 text-[#FF5900]" />
                  <span>Materia del plan de estudios Anáhuac</span>
                  <span className="text-[10px] text-[#191716]/50 font-normal">
                    ({activeArea.relatedCourse.semester})
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#191716]/10 space-y-1.5">
                  <h4 className="font-bold text-sm text-[#191716]">
                    {activeArea.relatedCourse.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#191716]/80 leading-relaxed">
                    {activeArea.relatedCourse.description}
                  </p>
                </div>
              </div>

              {/* Ejemplo de puesto y ruta de crecimiento */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech uppercase font-bold text-[#191716]/80">
                  <Briefcase className="w-4 h-4 text-[#FF5900]" />
                  <span>Puesto inicial y trayectoria de crecimiento</span>
                </div>
                <div className="text-xs sm:text-sm space-y-2 text-[#191716]/85">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-[#FF5900] shrink-0">Al graduarte:</span>
                    <span>{activeArea.careerPath.entryRole}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-[#191716] shrink-0">A 5-8 años:</span>
                    <span>{activeArea.careerPath.seniorGrowth}</span>
                  </div>
                  <div className="flex items-baseline gap-2 text-xs text-[#191716]/65">
                    <span className="font-medium shrink-0">Sectores:</span>
                    <span>{activeArea.careerPath.sectors}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nota técnica institucional obligatoria */}
          <div className="pt-4 border-t border-[#191716]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#191716]/65">
            <p>
              * La <strong>Sostenibilidad</strong> es un enfoque transversal integrado a lo largo de todo el plan de estudios, no una
              especialidad aislada. Los casos y la ciudad son ejemplos didácticos y no representan físicamente el campus.
            </p>
            <a
              href="#anahuac"
              className="inline-flex items-center gap-1.5 font-bold text-[#FF5900] hover:text-[#191716] transition-colors shrink-0 whitespace-nowrap"
            >
              <span>Ver materias en Anáhuac</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
