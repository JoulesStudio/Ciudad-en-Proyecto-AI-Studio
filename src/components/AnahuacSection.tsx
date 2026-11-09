import React from 'react';
import {
  GraduationCap,
  FlaskConical,
  Compass,
  Building,
  HardHat,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const AnahuacSection: React.FC = () => {
  const officialCourses = [
    {
      code: 'Semestre 2',
      name: 'Topografía',
      area: 'Vías de Comunicación',
      desc: 'Mide distancias, ángulos y desniveles para representar un terreno.',
    },
    {
      code: 'Semestre 3',
      name: 'Laboratorio de materiales I',
      area: 'Construcción',
      desc: 'Explora cómo se ponen a prueba los materiales de construcción.',
    },
    {
      code: 'Semestre 4',
      name: 'Geotecnia',
      area: 'Geotecnia',
      desc: 'Estudia cómo se comporta el suelo cuando recibe peso.',
    },
    {
      code: 'Semestre 5',
      name: 'Mecánica de fluidos',
      area: 'Hidráulica',
      desc: 'Entiende cómo se mueven el agua y otros fluidos y qué fuerzas ejercen.',
    },
    {
      code: 'Semestre 6',
      name: 'Diseño estructural',
      area: 'Estructuras',
      desc: 'Aplica principios de física y mecánica a elementos que sostienen una construcción.',
    },
  ];

  return (
    <section id="anahuac" className="py-16 bg-white border-b border-[#191716]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="font-mono-tech text-xs tracking-wider uppercase text-[#FF5900] font-bold">
              04 · EN UNIVERSIDAD ANÁHUAC MÉXICO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191716] tracking-tight">
              Ingeniería Civil · Campus Norte
            </h2>
            <p className="text-sm sm:text-base text-[#191716]/75">
              Formación técnica rigurosa complementada con laboratorios especializados, prácticas de campo y una
              visión empresarial orientada al liderazgo y la responsabilidad social.
            </p>
          </div>

          <div className="shrink-0 p-4 rounded-xl bg-[#FAF8F3] border border-[#191716]/10 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-[#FF5900]/10 text-[#FF5900]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-base text-[#191716]">9 Semestres</div>
              <div className="font-mono-tech text-[11px] text-[#191716]/60">Licenciatura Presencial</div>
            </div>
          </div>
        </div>

        {/* Pilares Institucionales Oficiales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#191716]/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#191716]/10 flex items-center justify-center text-[#FF5900]">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#191716]">
              Laboratorios de Materiales y Fluidos
            </h3>
            <p className="text-xs sm:text-sm text-[#191716]/75 leading-relaxed">
              El programa incluye prácticas en laboratorios de materiales, geotecnia, mecánica de fluidos y canales y tuberías.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#191716]/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#191716]/10 flex items-center justify-center text-[#FF5900]">
              <HardHat className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#191716]">
              Visitas a Obra y Práctica de Campo
            </h3>
            <p className="text-xs sm:text-sm text-[#191716]/75 leading-relaxed">
              El programa describe visitas a obra desde los primeros semestres para conocer cómo se ejecutan los proyectos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#191716]/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#191716]/10 flex items-center justify-center text-[#FF5900]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#191716]">
              Enfoque Empresarial y Ético
            </h3>
            <p className="text-xs sm:text-sm text-[#191716]/75 leading-relaxed">
              El plan combina formación en emprendimiento, ingeniería financiera, dirección de empresas, ética y gerencia de proyectos.
            </p>
          </div>
        </div>

        {/* Materias Clave del Plan Oficial de Estudios */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#191716]">
              Ejemplos representativos de materias troncales
            </h3>
            <span className="font-mono-tech text-xs text-[#191716]/50 hidden sm:inline">
              Plan oficial de 9 semestres
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {officialCourses.map((c) => (
              <div
                key={c.code}
                className="p-4 rounded-xl bg-white border border-[#191716]/10 hover:border-[#FF5900]/50 transition-colors space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-tech font-bold text-[#FF5900]">{c.code}</span>
                  <span className="text-[#191716]/60 font-medium">{c.area}</span>
                </div>
                <h4 className="font-bold text-sm text-[#191716]">{c.name}</h4>
                <p className="text-xs text-[#191716]/70 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#191716]/55 italic pt-1">
            * Nota: Los ejemplos laborales y de proyección presentados en este prototipo son casos ilustrativos con fines
            de orientación vocacional y deben diferenciarse del mapa curricular oficial.
          </p>
        </div>

        {/* CTA Institucional Directo */}
        <div className="p-8 rounded-2xl bg-[#FAF8F3] border-2 border-[#191716]/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-[#191716]">
              ¿Te interesa conocer las instalaciones y el plan de estudios completo?
            </h3>
            <p className="text-xs sm:text-sm text-[#191716]/75">
              En la página oficial encontrarás el plan completo y los datos de contacto del equipo de Promoción de Campus Norte.
            </p>
          </div>

          <a
            href="https://mexico.anahuac.mx/licenciaturas/ingenieria-civil"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#FF5900] text-[#191716] hover:bg-[#E04E00] rounded-xl shadow-xs transition-colors shrink-0 min-h-[48px]"
          >
            <span>Conocer el plan y contactar a Promoción Campus Norte</span>
            <ExternalLink className="w-4 h-4 text-[#191716]" />
          </a>
        </div>
      </div>
    </section>
  );
};
