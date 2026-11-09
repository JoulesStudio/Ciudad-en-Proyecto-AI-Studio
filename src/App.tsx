import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { GradeLevel } from './types';
import { Header } from './components/Header';
import { Dashboard, GradeSwitch, ZONE_IDS, ZoneMission } from './components/Hero';
import type { ZoneId } from './components/Hero';
import { Explorer } from './components/Explorer';
import { Challenge } from './components/Challenge';
import { Comparator } from './components/Comparator';
import { AnahuacSection } from './components/AnahuacSection';
import { Footer } from './components/Footer';
import { GuideModal } from './components/GuideModal';

const REPAIRED_KEY = 'anahuac_civil_repaired_zones';
const GRADE_KEY = 'anahuac_civil_grade';

function readGrade(): GradeLevel {
  try {
    return sessionStorage.getItem(GRADE_KEY) === '6' ? '6' : '5';
  } catch {
    return '5';
  }
}

function readRepairs(): Set<ZoneId> {
  try {
    const saved: unknown = JSON.parse(sessionStorage.getItem(REPAIRED_KEY) ?? '[]');
    return new Set(ZONE_IDS.filter(id => Array.isArray(saved) && saved.includes(id)));
  } catch {
    return new Set();
  }
}

function readRoute() {
  return window.location.hash.slice(1) || 'mapa';
}

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const [grade, setGrade] = useState<GradeLevel>(readGrade);
  const [repaired, setRepaired] = useState(readRepairs);
  const [explorerArea, setExplorerArea] = useState<string>('estructuras');
  const [visited, setVisited] = useState<Set<string>>(new Set(['estructuras']));
  const [guideOpen, setGuideOpen] = useState(false);
  const main = useRef<HTMLElement>(null);

  useEffect(() => {
    function changeRoute() {
      setRoute(readRoute());
      setGuideOpen(false);
    }
    window.addEventListener('hashchange', changeRoute);
    return () => window.removeEventListener('hashchange', changeRoute);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      main.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [route]);

  useEffect(() => {
    try { sessionStorage.setItem(GRADE_KEY, grade); } catch { /* Funciona en memoria. */ }
  }, [grade]);

  useEffect(() => {
    try { sessionStorage.setItem(REPAIRED_KEY, JSON.stringify([...repaired])); } catch { /* Funciona en memoria. */ }
  }, [repaired]);

  function markRepaired(id: ZoneId) {
    setRepaired(previous => previous.has(id) ? previous : new Set([...previous, id]));
  }

  function selectExplorerArea(id: string) {
    setExplorerArea(id);
    setVisited(previous => previous.has(id) ? previous : new Set([...previous, id]));
  }

  const zone = ZONE_IDS.find(id => route === `zona/${id}`);
  const rain = ['mision-lluvia', 'reto', 'decision-lluvia'].includes(route);
  const compare = ['mision-equipo', 'comparador', 'decision-equipo'].includes(route);
  const extras = rain || compare || route === 'explorar' || route === 'anahuac';

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#191716]">
      <Header onOpenGuide={() => setGuideOpen(true)} />
      <main ref={main} tabIndex={-1} className="focus:outline-none">
        {zone ? <ZoneMission key={zone} id={zone} grade={grade} onGrade={setGrade}
          repaired={repaired.has(zone)} onRepair={() => markRepaired(zone)} /> : extras ? (
          <>
            <div className="sticky top-20 z-30 border-b border-[#D3BCA8] bg-[#FBF2E4]">
              <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1 sm:px-6">
                <a href="#mapa" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-[#693618] hover:underline"><ArrowLeft size={16} aria-hidden="true" /> Volver al mapa</a>
                {rain && <GradeSwitch grade={grade} onChange={setGrade} />}
              </div>
            </div>
            {rain && <Challenge grade={grade} />}
            {compare && <Comparator />}
            {route === 'explorar' && <Explorer activeAreaId={explorerArea} viewedAreas={visited} onSelectArea={selectExplorerArea} />}
            {route === 'anahuac' && <AnahuacSection />}
          </>
        ) : <Dashboard grade={grade} onGrade={setGrade} repaired={repaired}
          onOpen={id => { window.location.hash = `zona/${id}`; }} onReset={() => setRepaired(new Set())} />}
      </main>
      {!zone && <Footer />}
      <GuideModal isOpen={guideOpen} onClose={() => setGuideOpen(false)} grade={grade} onGradeChange={setGrade} />
    </div>
  );
}
