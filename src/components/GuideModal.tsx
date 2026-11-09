import React, { useState, useEffect } from 'react';
import { X, Compass, Loader2, Sparkles, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import { GradeLevel } from '../types';
import { GUIDE_TOPICS, GuideTopic } from '../data/editorialGuide';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  grade: GradeLevel;
  onGradeChange: (grade: GradeLevel) => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  isOpen,
  onClose,
  grade,
  onGradeChange,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<'matematicas' | 'campo' | 'diferencias' | 'campus'>('matematicas');
  const [loading, setLoading] = useState<boolean>(false);
  const [responseText, setResponseText] = useState<string>('');
  const [isAiGenerated, setIsAiGenerated] = useState<boolean>(false);

  const currentTopic = GUIDE_TOPICS.find((t) => t.id === selectedTopicId) || GUIDE_TOPICS[0];

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Cargar respuesta al cambiar tema o grado
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);

    const fetchAnswer = async () => {
      try {
        const res = await fetch('/api/orientacion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tema: selectedTopicId,
            grado: grade,
          }),
        });

        if (!res.ok) {
          throw new Error('Respuesta no exitosa');
        }

        const data = await res.json();
        if (isMounted) {
          if (data && data.ok === true && typeof data.texto === 'string') {
            setResponseText(data.texto);
            setIsAiGenerated(true);
          } else {
            // Fallback editorial garantizado
            setResponseText(currentTopic.responses[grade]);
            setIsAiGenerated(false);
          }
        }
      } catch (err) {
        if (isMounted) {
          // Fallback editorial garantizado ante error de red
          setResponseText(currentTopic.responses[grade]);
          setIsAiGenerated(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAnswer();

    return () => {
      isMounted = false;
    };
  }, [selectedTopicId, grade, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#191716]/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl border border-[#191716]/15 shadow-2xl overflow-hidden flex flex-col">
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#191716]/10 bg-[#FAF8F3]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FF5900]/15 text-[#FF5900]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 id="guide-title" className="font-extrabold text-base sm:text-lg text-[#191716]">
                Guía de Orientación Vocacional
              </h2>
              <p className="text-xs text-[#191716]/60">
                Preguntas frecuentes resueltas con rigor académico y sin datos personales
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#191716]/60 hover:text-[#191716] hover:bg-[#191716]/5 rounded-xl transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Cerrar guía"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selector de Nivel (5.º vs 6.º Área 1) */}
        <div className="px-6 py-3 bg-[#FAF8F3]/60 border-b border-[#191716]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="font-medium text-[#191716]/75">Nivel de profundidad:</span>
          <div className="flex bg-white p-1 rounded-lg border border-[#191716]/15">
            <button
              type="button"
              onClick={() => onGradeChange('5')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                grade === '5' ? 'bg-[#FF5900] text-[#191716]' : 'text-[#191716]/70 hover:text-[#191716]'
              }`}
            >
              5.º de prepa
            </button>
            <button
              type="button"
              onClick={() => onGradeChange('6')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                grade === '6' ? 'bg-[#FF5900] text-[#191716]' : 'text-[#191716]/70 hover:text-[#191716]'
              }`}
            >
              6.º Área 1 (Físico-Matemático)
            </button>
          </div>
        </div>

        {/* Cuatro Preguntas Predefinidas (Tabs) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-2 bg-[#FAF8F3] border-b border-[#191716]/10">
          {GUIDE_TOPICS.map((topic) => {
            const isSelected = selectedTopicId === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedTopicId(topic.id)}
                className={`p-2.5 rounded-xl text-left transition-all cursor-pointer min-h-[44px] flex flex-col justify-center ${
                  isSelected
                    ? 'bg-white text-[#191716] font-bold shadow-xs border border-[#191716]/15 ring-1 ring-[#FF5900]'
                    : 'text-[#191716]/70 hover:bg-white/60 hover:text-[#191716]'
                }`}
                aria-pressed={isSelected}
              >
                <span className="text-[10px] font-mono-tech text-[#FF5900] font-bold">
                  {topic.id === 'matematicas' && '01'}
                  {topic.id === 'campo' && '02'}
                  {topic.id === 'diferencias' && '03'}
                  {topic.id === 'campus' && '04'}
                </span>
                <span className="text-xs leading-tight line-clamp-1">{topic.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Contenido de la Respuesta */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Título de la Pregunta Actual */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#191716]/10">
            <h3 className="font-extrabold text-base sm:text-lg text-[#191716]">
              {currentTopic.question}
            </h3>

            {/* Badge de Estado: demostración o IA */}
            <div>
              {loading ? (
                <span className="font-mono-tech text-[11px] text-[#191716]/60 inline-flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FF5900]" />
                  Consultando...
                </span>
              ) : isAiGenerated ? (
                <span className="font-mono-tech text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Respuesta generada con IA
                </span>
              ) : (
                <span className="font-mono-tech text-[10px] uppercase font-bold text-[#6B3F23] bg-[#FAF8F3] px-2.5 py-1 rounded-md border border-[#191716]/10 inline-flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#FF5900]" />
                  Respuesta de la guía · modo demostración
                </span>
              )}
            </div>
          </div>

          {/* Cuerpo de la respuesta */}
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3 text-[#191716]/60">
              <Loader2 className="w-6 h-6 animate-spin text-[#FF5900]" />
              <p className="text-xs font-mono-tech">Cargando respuesta vocacional...</p>
            </div>
          ) : (
            <div className="text-xs sm:text-sm text-[#191716]/85 leading-relaxed whitespace-pre-line space-y-2 font-normal">
              {responseText}
            </div>
          )}
        </div>

        {/* Pie del Modal con Enlace Oficial */}
        <div className="px-6 py-4 bg-[#FAF8F3] border-t border-[#191716]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#191716]/70">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Sin almacenamiento de datos personales ni cookies de seguimiento.</span>
          </div>

          <a
            href="https://mexico.anahuac.mx/licenciaturas/ingenieria-civil"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-[#FF5900] hover:text-[#191716] transition-colors"
          >
            <span>Portal oficial Anáhuac</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
