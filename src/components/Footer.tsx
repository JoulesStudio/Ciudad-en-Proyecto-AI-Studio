import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#191716] text-[#FAF8F3] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Columna Marca & Identidad */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src="/assets/aistudio/LOGO_ANAHUAC_b64d5445.png"
                alt="Escudo oficial Universidad Anáhuac"
                className="h-14 w-auto object-contain bg-white rounded-full p-1"
              />
              <div>
                <div className="font-extrabold text-base tracking-tight text-white uppercase">
                  Universidad Anáhuac México
                </div>
                <div className="font-mono-tech text-xs text-[#FF5900] tracking-wider uppercase font-semibold">
                  CAMPUS NORTE · FACULTAD DE INGENIERÍA
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#FAF8F3]/70 leading-relaxed max-w-md">
              Experiencia digital interactiva de orientación vocacional para estudiantes de 5.º de bachillerato y 6.º de Área 1
              (Físico-Matemático). Diseñada para explorar el impacto tangible de la Ingeniería Civil en el territorio urbano.
            </p>
          </div>

          {/* Enlaces Oficiales Verificados */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono-tech text-xs uppercase font-bold text-[#FF5900] tracking-wider">
              Portales Institucionales Oficiales
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#FAF8F3]/80">
              <li>
                <a
                  href="https://mexico.anahuac.mx/licenciaturas/ingenieria-civil"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF5900] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Licenciatura en Ingeniería Civil (Campus Norte)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://mexico.anahuac.mx/licenciaturas/arquitectura"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF5900] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Licenciatura en Arquitectura Anáhuac</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.anahuac.mx/ingenieria-civil"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF5900] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Red de Universidades Anáhuac · Ingeniería Civil</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.anahuac.mx/mexico/files/Manual-Identidad-2025.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF5900] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Manual de Identidad Institucional Anáhuac 2025</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Privacidad y Criterios Éticos */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono-tech text-xs uppercase font-bold text-[#FF5900] tracking-wider">
              Privacidad y Ética
            </h4>
            <p className="text-xs text-[#FAF8F3]/70 leading-relaxed">
              Esta plataforma es 100% interactiva y privada: no recopila nombres, correos ni datos personales. No utiliza cookies de rastreo
              comercial ni algoritmos de perfilamiento.
            </p>
          </div>
        </div>

        {/* Nota Breve Institucional Obligatoria en Pie */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F3]/60">
          <p className="font-mono-tech">
            Prototipo de orientación vocacional. Ciudad y casos ilustrativos.
          </p>
          <p>
            © {new Date().getFullYear()} Universidad Anáhuac México · Facultad de Ingeniería · Campus Norte.
          </p>
        </div>
      </div>
    </footer>
  );
};
