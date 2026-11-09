import React from 'react';
import { AREAS_DATA } from '../data/areas';

interface CityMapProps {
  onSelectArea: (id: string) => void;
  repairedAreas: ReadonlySet<string>;
}

export const CityMap: React.FC<CityMapProps> = ({
  onSelectArea,
  repairedAreas,
}) => {
  // Coordenadas calculadas en el viewBox [0 0 920 620] del mapa
  const hotspotPositions: Record<string, { cx: number; cy: number; label: string; offsetLabel: string }> = {
    estructuras: { cx: 280, cy: 195, label: '01 Estructuras', offsetLabel: 'Torre sismorresistente y puente' },
    hidraulica: { cx: 580, cy: 460, label: '02 Agua e Hidráulica', offsetLabel: 'Río y canal de control pluvial' },
    movilidad: { cx: 660, cy: 260, label: '03 Movilidad y Transporte', offsetLabel: 'Nodo vial y viaducto elevado' },
    geotecnia: { cx: 190, cy: 410, label: '04 Suelos y Geotecnia', offsetLabel: 'Talud y cimentación profunda' },
    construccion: { cx: 440, cy: 125, label: '05 Construcción y Gestión', offsetLabel: 'Grúa torre y obra en proceso' },
    sostenibilidad: { cx: 430, cy: 320, label: '06 Infraestructura Sostenible', offsetLabel: 'Techos vivos y captación' },
  };

  return (
    <div className="relative w-full rounded-2xl border border-[#191716]/10 bg-[#FAF8F3] overflow-hidden shadow-sm">
      {/* Barra superior de la maqueta */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#191716]/10 bg-white/70 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono-tech text-[11px] font-bold tracking-wider text-[#FF5900] uppercase">
            MAPA INTERACTIVO · 06 ZONAS
          </span>
          <span className="text-[#191716]/30 hidden sm:inline">|</span>
          <span className="text-xs text-[#191716]/60 hidden sm:inline">
            Maqueta 2.5D ilustrativa
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono-tech text-xs text-[#191716]/70">
            Reparadas: <strong className="text-[#305B4C]">{repairedAreas.size}</strong>/6
          </span>
        </div>
      </div>

      {/* Contenedor del SVG Isométrico con retícula técnica */}
      <div className="relative w-full blueprint-grid overflow-hidden">
        <svg
          viewBox="0 0 920 620"
          className="w-full h-auto block select-none"
          role="group"
          aria-label="Maqueta interactiva 2.5D de la ciudad en proyecto mostrando las seis áreas de la ingeniería civil"
        >
          <defs>
            {/* Sombras suaves para volumen isométrico */}
            <filter id="shadow-soft" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#191716" floodOpacity="0.08" />
            </filter>
            <filter id="shadow-building" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="-4" dy="8" stdDeviation="6" floodColor="#191716" floodOpacity="0.12" />
            </filter>

            {/* Gradiente de río urbano */}
            <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A7F85" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#246D73" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1C575C" stopOpacity="0.9" />
            </linearGradient>

            {/* Patrón de ventanas */}
            <pattern id="facadeWindows" width="12" height="18" patternUnits="userSpaceOnUse">
              <rect x="2" y="3" width="7" height="11" fill="#191716" fillOpacity="0.16" rx="1" />
            </pattern>
            <pattern id="facadeWindowsLight" width="12" height="18" patternUnits="userSpaceOnUse">
              <rect x="2" y="3" width="7" height="11" fill="#FAF8F3" fillOpacity="0.6" rx="1" />
            </pattern>
          </defs>

          {/* BASE DE LA PLATAFORMA ISOMÉTRICA (ISLAND BLOCK) */}
          {/* Capa de corte geológico y talud inferior */}
          <g id="terrain-platform">
            {/* Cara lateral izquierda (estratos de suelo) */}
            <polygon
              points="60,340 460,540 460,575 60,375"
              fill="#523927"
              stroke="#382518"
              strokeWidth="1.5"
            />
            {/* Estrato intermedio de grava y arcilla */}
            <polygon
              points="60,360 460,560 460,575 60,375"
              fill="#3E2A1E"
              stroke="#382518"
              strokeWidth="1"
            />
            {/* Líneas de estratigrafía geotécnica */}
            <path
              d="M 100,370 Q 200,410 320,470 T 450,545"
              stroke="#6B3F23"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            />
            <path
              d="M 120,385 Q 240,435 360,495 T 450,560"
              stroke="#8B5A38"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Cara lateral derecha de la plataforma */}
            <polygon
              points="460,540 860,340 860,375 460,575"
              fill="#3C3632"
              stroke="#2B2724"
              strokeWidth="1.5"
            />
            {/* Líneas de corte lateral */}
            <line x1="560" y1="525" x2="560" y2="560" stroke="#2B2724" strokeWidth="1" />
            <line x1="680" y1="465" x2="680" y2="500" stroke="#2B2724" strokeWidth="1" />
            <line x1="780" y1="415" x2="780" y2="450" stroke="#2B2724" strokeWidth="1" />

            {/* Superficie superior principal (suelo urbano) */}
            <polygon
              points="460,140 860,340 460,540 60,340"
              fill="#EFEAE1"
              stroke="#D8D1C3"
              strokeWidth="2"
            />
          </g>

          {/* RÍO URBANO Y CANAL HIDRÁULICO */}
          <g id="river-system">
            {/* Cauce del río que corta la ciudad en diagonal */}
            <path
              d="M 260,240 
                 Q 360,290 440,350 
                 Q 520,410 660,440 
                 L 740,400 
                 Q 590,370 510,320 
                 Q 430,270 330,205 Z"
              fill="url(#riverGradient)"
              stroke="#1C575C"
              strokeWidth="1.5"
            />
            {/* Reflejos y corrientes en el agua */}
            <path
              d="M 310,230 Q 380,275 460,335"
              stroke="#76C4C8"
              strokeWidth="1.5"
              strokeOpacity="0.7"
              strokeDasharray="18 10"
              fill="none"
            />
            <path
              d="M 440,320 Q 520,380 620,415"
              stroke="#A8E4E7"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              strokeDasharray="22 12"
              fill="none"
            />
            <path
              d="M 500,360 Q 570,410 680,430"
              stroke="#76C4C8"
              strokeWidth="1"
              strokeOpacity="0.6"
              strokeDasharray="15 8"
              fill="none"
            />

            {/* Muro de contención y canalización hidráulica del río */}
            <path
              d="M 260,240 L 260,250 Q 360,300 440,360 Q 520,420 660,450 L 660,440"
              fill="none"
              stroke="#6B3F23"
              strokeWidth="3"
            />
          </g>

          {/* RED DE VIALIDADES Y CRUCES */}
          <g id="road-network">
            {/* Avenida principal diagonal (suroeste a noreste) */}
            <polygon
              points="140,380 180,400 780,200 740,180"
              fill="#2C2927"
              stroke="#191716"
              strokeWidth="1"
            />
            {/* Líneas discontinuas de carril */}
            <path
              d="M 160,390 L 760,190"
              stroke="#F4EFE6"
              strokeWidth="1.5"
              strokeDasharray="12 10"
              strokeOpacity="0.85"
            />

            {/* Avenida transversal (noroeste a sureste) */}
            <polygon
              points="400,170 440,190 620,460 580,480"
              fill="#2C2927"
              stroke="#191716"
              strokeWidth="1"
            />
            <path
              d="M 420,180 L 600,470"
              stroke="#FF5900"
              strokeWidth="1.5"
              strokeDasharray="14 12"
              strokeOpacity="0.9"
            />

            {/* Paso peatonal cebra en intersección */}
            <g stroke="#FAF8F3" strokeWidth="2.5" strokeOpacity="0.9">
              <line x1="435" y1="285" x2="455" y2="295" />
              <line x1="442" y1="280" x2="462" y2="290" />
              <line x1="449" y1="275" x2="469" y2="285" />
            </g>

            {/* Vehículos esquemáticos en movimiento */}
            {/* Autobús de transporte masivo (naranja Anáhuac) */}
            <g transform="translate(620, 240)">
              <polygon points="0,0 28,-14 36,-10 8,4" fill="#FF5900" stroke="#191716" strokeWidth="1" />
              <polygon points="0,0 8,4 8,10 0,6" fill="#D94A00" stroke="#191716" strokeWidth="1" />
              <polygon points="8,4 36,-10 36,-4 8,10" fill="#B33C00" stroke="#191716" strokeWidth="1" />
            </g>

            {/* Automóvil civil (carbón) */}
            <g transform="translate(260, 340)">
              <polygon points="0,0 16,-8 22,-5 6,3" fill="#191716" />
              <polygon points="0,0 6,3 6,6 0,3" fill="#3A3633" />
            </g>
          </g>

          {/* PUENTE ATIRANTADO SOBRE EL RÍO */}
          <g id="cable-bridge" filter="url(#shadow-soft)">
            {/* Tablero del puente cruzando el río */}
            <polygon
              points="450,290 490,310 590,260 550,240"
              fill="#D9D2C5"
              stroke="#191716"
              strokeWidth="1.5"
            />
            {/* Pilón central vertical del puente */}
            <polygon
              points="515,300 525,305 525,210 515,205"
              fill="#191716"
              stroke="#FF5900"
              strokeWidth="1.5"
            />
            <polygon
              points="525,305 533,301 533,206 525,210"
              fill="#3A3633"
            />
            {/* Tirantes de acero de alta tensión */}
            <g stroke="#FF5900" strokeWidth="1.5" strokeOpacity="0.85">
              <line x1="520" y1="215" x2="465" y2="295" />
              <line x1="520" y1="225" x2="480" y2="303" />
              <line x1="520" y1="235" x2="495" y2="310" />
              <line x1="520" y1="215" x2="575" y2="245" />
              <line x1="520" y1="225" x2="560" y2="252" />
              <line x1="520" y1="235" x2="545" y2="260" />
            </g>
          </g>

          {/* EDIFICIOS Y MANZANAS URBANAS */}
          {/* 1. TORRE CORPORATIVA CON MARCO ESTRUCTURAL (Zona 01) */}
          <g id="tower-structural" filter="url(#shadow-building)">
            {/* Sombra proyectada */}
            <polygon points="240,240 310,205 340,220 270,255" fill="#191716" fillOpacity="0.12" />

            {/* Fachada izquierda de la torre */}
            <polygon
              points="240,230 280,250 280,100 240,80"
              fill="#E3DDD2"
              stroke="#191716"
              strokeWidth="1.5"
            />
            {/* Retícula estructural de contraventeos (Cruces de San Andrés) */}
            <g stroke="#FF5900" strokeWidth="1.5" strokeOpacity="0.75">
              <line x1="240" y1="230" x2="280" y2="200" />
              <line x1="240" y1="200" x2="280" y2="230" />
              <line x1="240" y1="180" x2="280" y2="150" />
              <line x1="240" y1="150" x2="280" y2="180" />
              <line x1="240" y1="130" x2="280" y2="100" />
              <line x1="240" y1="100" x2="280" y2="130" />
            </g>

            {/* Fachada derecha de la torre */}
            <polygon
              points="280,250 330,225 330,75 280,100"
              fill="#C7BEB0"
              stroke="#191716"
              strokeWidth="1.5"
            />
            {/* Ventanas en fachada derecha */}
            <g fill="#191716" fillOpacity="0.3">
              <rect x="290" y="110" width="8" height="12" rx="1" transform="skewY(-26)" />
              <rect x="305" y="102" width="8" height="12" rx="1" transform="skewY(-26)" />
              <rect x="290" y="135" width="8" height="12" rx="1" transform="skewY(-26)" />
              <rect x="305" y="127" width="8" height="12" rx="1" transform="skewY(-26)" />
              <rect x="290" y="160" width="8" height="12" rx="1" transform="skewY(-26)" />
              <rect x="305" y="152" width="8" height="12" rx="1" transform="skewY(-26)" />
            </g>

            {/* Techo de la torre */}
            <polygon
              points="240,80 280,100 330,75 290,55"
              fill="#FAF8F3"
              stroke="#191716"
              strokeWidth="1.5"
            />
            {/* Cuarto de máquinas y helipuerto */}
            <polygon points="265,80 290,92 310,82 285,70" fill="#FF5900" />
            <polygon points="265,80 290,92 290,86 265,74" fill="#D94A00" />
          </g>

          {/* 2. ZONA DE CONSTRUCCIÓN Y GESTIÓN CON GRÚA TORRE (Zona 05) */}
          <g id="construction-site" filter="url(#shadow-building)">
            {/* Losa en proceso con varillas expuestas */}
            <polygon
              points="410,180 470,210 510,190 450,160"
              fill="#D4C8B8"
              stroke="#6B3F23"
              strokeWidth="1.5"
            />
            <polygon
              points="410,180 470,210 470,225 410,195"
              fill="#948574"
              stroke="#6B3F23"
              strokeWidth="1.5"
            />
            <polygon
              points="470,210 510,190 510,205 470,225"
              fill="#6B5E4F"
              stroke="#6B3F23"
              strokeWidth="1.5"
            />

            {/* Varillas de acero verticales esperando el siguiente colado */}
            <g stroke="#FF5900" strokeWidth="1.2">
              <line x1="420" y1="185" x2="420" y2="170" />
              <line x1="435" y1="193" x2="435" y2="178" />
              <line x1="450" y1="200" x2="450" y2="185" />
              <line x1="465" y1="208" x2="465" y2="193" />
              <line x1="490" y1="195" x2="490" y2="180" />
            </g>

            {/* GRÚA TORRE DE CONSTRUCCIÓN (Mástil, pluma y contrapeso) */}
            {/* Mástil vertical */}
            <polygon points="446,165 454,169 454,50 446,46" fill="#FF5900" stroke="#191716" strokeWidth="1" />
            {/* Celosía del mástil */}
            <g stroke="#191716" strokeWidth="0.8">
              <line x1="446" y1="150" x2="454" y2="140" />
              <line x1="446" y1="140" x2="454" y2="150" />
              <line x1="446" y1="120" x2="454" y2="110" />
              <line x1="446" y1="110" x2="454" y2="120" />
              <line x1="446" y1="90" x2="454" y2="80" />
              <line x1="446" y1="80" x2="454" y2="90" />
            </g>
            {/* Cabina de operador */}
            <polygon points="442,50 458,58 458,40 442,32" fill="#FAF8F3" stroke="#191716" strokeWidth="1" />
            {/* Pluma horizontal larga */}
            <line x1="450" y1="42" x2="550" y2="70" stroke="#FF5900" strokeWidth="3" />
            {/* Contrapluma corta */}
            <line x1="450" y1="42" x2="390" y2="25" stroke="#FF5900" strokeWidth="3" />
            {/* Bloque de contrapeso de concreto */}
            <polygon points="385,24 400,28 400,38 385,34" fill="#6B3F23" stroke="#191716" strokeWidth="1" />
            {/* Tirantes de la grúa y cable con gancho */}
            <line x1="450" y1="20" x2="550" y2="70" stroke="#191716" strokeWidth="0.8" />
            <line x1="450" y1="20" x2="390" y2="25" stroke="#191716" strokeWidth="0.8" />
            {/* Cable y carga izada */}
            <line x1="510" y1="59" x2="510" y2="115" stroke="#191716" strokeWidth="1" strokeDasharray="3 2" />
            <polygon points="505,115 515,115 515,123 505,123" fill="#FF5900" stroke="#191716" strokeWidth="0.8" />
          </g>

          {/* 3. EDIFICIO CON TECHO VIVO Y SOSTENIBILIDAD (Zona 06) */}
          <g id="green-building" filter="url(#shadow-building)">
            {/* Fachadas */}
            <polygon
              points="380,340 440,370 440,290 380,260"
              fill="#EAE4D8"
              stroke="#191716"
              strokeWidth="1.5"
            />
            <polygon
              points="440,370 490,345 490,265 440,290"
              fill="#CEC3B2"
              stroke="#191716"
              strokeWidth="1.5"
            />
            {/* Techo verde vivo con vegetación de retención */}
            <polygon
              points="380,260 440,290 490,265 430,235"
              fill="#3B6B48"
              stroke="#2B4E34"
              strokeWidth="1.5"
            />
            {/* Celdas fotovoltaicas en el techo */}
            <polygon points="435,248 455,258 450,262 430,252" fill="#2A7F85" stroke="#1C575C" strokeWidth="0.8" />
            <polygon points="458,259 478,269 473,273 453,263" fill="#2A7F85" stroke="#1C575C" strokeWidth="0.8" />

            {/* Jardín de lluvia y bio-retención a nivel de calle */}
            <polygon
              points="350,355 375,368 410,350 385,338"
              fill="#6B8E5F"
              stroke="#4E6845"
              strokeWidth="1"
            />
          </g>

          {/* 4. ZONA DE SUELOS Y GEOTECNIA (Zona 04) */}
          <g id="geotech-zone">
            {/* Talud de corte escalonado */}
            <polygon
              points="140,430 220,470 220,445 140,405"
              fill="#8B5A38"
              stroke="#6B3F23"
              strokeWidth="1.5"
            />
            <polygon
              points="220,470 260,450 260,425 220,445"
              fill="#6B3F23"
              stroke="#523927"
              strokeWidth="1.5"
            />

            {/* Pilotes de cimentación visibles en el corte del subsuelo */}
            <g stroke="#FAF8F3" strokeWidth="3" opacity="0.9">
              <line x1="170" y1="440" x2="170" y2="520" />
              <line x1="195" y1="452" x2="195" y2="535" />
              <line x1="230" y1="455" x2="230" y2="540" />
            </g>
            {/* Cabezal de concreto sobre los pilotes */}
            <polygon points="155,435 245,480 245,465 155,420" fill="#D4C8B8" stroke="#191716" strokeWidth="1" />
          </g>

          {/* 5. INFRAESTRUCTURA HIDRÁULICA Y COLECTOR (Zona 02) */}
          <g id="hydraulics-detail">
            {/* Vaso regulador / cárcamo de retención pluvial junto al río */}
            <polygon
              points="550,470 610,500 660,475 600,445"
              fill="#246D73"
              stroke="#1C575C"
              strokeWidth="2"
            />
            {/* Rejilla de desbaste y compuerta de control */}
            <polygon points="560,475 580,485 580,478 560,468" fill="#FF5900" />
            <polygon points="585,487 605,497 605,490 585,480" fill="#D94A00" />
            {/* Tubería emisora de concreto desembocando al canal */}
            <ellipse cx="615" cy="460" rx="9" ry="14" fill="#3A3633" stroke="#FAF8F3" strokeWidth="1.5" />
          </g>

          {/* 6. NODO DE MOVILIDAD Y VIADUCTO (Zona 03) */}
          <g id="mobility-hub" filter="url(#shadow-building)">
            {/* Estación de transferencia y viaducto elevado */}
            <polygon
              points="640,240 700,270 760,240 700,210"
              fill="#FAF8F3"
              stroke="#191716"
              strokeWidth="1.5"
            />
            {/* Cubierta ondulada moderna */}
            <path
              d="M 640,230 Q 670,210 700,230 Q 730,210 760,230 L 760,240 L 640,240 Z"
              fill="#FF5900"
              stroke="#191716"
              strokeWidth="1"
            />
            {/* Columnas cilíndricas del viaducto */}
            <polygon points="665,255 675,260 675,310 665,305" fill="#C7BEB0" stroke="#191716" strokeWidth="1" />
            <polygon points="725,225 735,230 735,280 725,275" fill="#C7BEB0" stroke="#191716" strokeWidth="1" />
          </g>

          {/* ÁRBOLES Y VEGETACIÓN URBANA */}
          <g id="urban-trees">
            {/* Árbol 1 */}
            <circle cx="210" cy="320" r="14" fill="#4E6845" />
            <circle cx="210" cy="315" r="10" fill="#6B8E5F" />
            {/* Árbol 2 */}
            <circle cx="340" cy="410" r="16" fill="#4E6845" />
            <circle cx="340" cy="404" r="12" fill="#6B8E5F" />
            {/* Árbol 3 */}
            <circle cx="720" cy="340" r="15" fill="#4E6845" />
            <circle cx="720" cy="334" r="11" fill="#6B8E5F" />
          </g>

          <g aria-hidden="true" pointerEvents="none" strokeLinejoin="round" strokeLinecap="round">
            {repairedAreas.has('estructuras') ? <path d="m300 241 19-10 18 9-20 11Z" fill="#7DA66A" stroke="#3F644E" strokeWidth="2" /> : <path d="m268 115 9 15-12 8 10 12-10 13 12 16-8 12" fill="none" stroke="#A33022" strokeWidth="5" />}
            {repairedAreas.has('hidraulica') ? <path d="m608 484 27-13m-11 15 20-10" fill="none" stroke="#BAE5C7" strokeWidth="4" /> : <path d="M556 446q32-20 49-8 25-10 54 13 29 6 15 25-26 9-50 2-39 8-67-10-13-9-1-22Z" fill="#67A7B0" fillOpacity=".85" stroke="#214E5C" strokeWidth="3" />}
            {repairedAreas.has('movilidad') ? <path d="m686 239 32-13m-8-1 9 1-6 8" fill="none" stroke="#478467" strokeWidth="5" /> : <path d="m680 258 44-20m-44 29 44-20m-44 3v22m44-43v23" fill="none" stroke="#B23C23" strokeWidth="5" />}
            {repairedAreas.has('geotecnia') ? <path d="m154 436 61 30m-54-40 57 28" fill="none" stroke="#ABC087" strokeWidth="4" /> : <path d="m156 425 16 5-3 10 13 2 5 13 15-2 6 8" fill="none" stroke="#6A261B" strokeWidth="5" />}
            {repairedAreas.has('construccion') ? <path d="m420 180 43 22 34-15m-13 1 13-1-6 8" fill="none" stroke="#52845C" strokeWidth="4" /> : <g fill="#A74B2B" stroke="#5F3625" strokeWidth="2"><path d="m417 189 13-9 17 6-12 10Z"/><path d="m453 185 19 4 6 12-22-3Z"/><path d="m437 200 8-7 13 7-8 10Z"/></g>}
            {repairedAreas.has('sostenibilidad') ? <g fill="#82AE6C" stroke="#355C4E" strokeWidth="2"><circle cx="383" cy="354" r="10"/><circle cx="403" cy="363" r="9"/><circle cx="373" cy="370" r="10"/></g> : <path d="m373 344 35 15-23 17-38-15Z" fill="#72959A" stroke="#526C71" strokeWidth="3" />}
          </g>
          {/* HOTSPOTS INTERACTIVOS NUMERADOS 01 A 06 */}
          {AREAS_DATA.map((area) => {
            const pos = hotspotPositions[area.id];
            if (!pos) return null;
            const fixed = repairedAreas.has(area.id);

            return (
              <g
                key={area.id}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => onSelectArea(area.id)}
                role="button"
                tabIndex={0}
                aria-label={`Abrir misión ${area.number}: ${area.title}, ${fixed ? 'reparada' : 'en alerta'}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectArea(area.id);
                  }
                }}
              >
                <rect x={pos.cx - 72} y={pos.cy - 43} width="144" height="69" fill="transparent" />
                {/* Sombra del pin */}
                <ellipse cx={pos.cx} cy={pos.cy + 18} rx="12" ry="5" fill="#191716" fillOpacity="0.3" />

                {/* Pin circular exterior */}
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r="20"
                  fill={fixed ? '#2B6252' : '#A23823'}
                  stroke={fixed ? '#DAECCB' : '#FFB784'}
                  strokeWidth="2.5"
                  className="transition-colors duration-200 hover:scale-110"
                />

                {/* Número del hotspot */}
                <text
                  x={pos.cx}
                  y={pos.cy + 4}
                  textAnchor="middle"
                  fill="#FFF4DF"
                  fontFamily="'Space Mono', monospace"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {area.number}
                </text>

                {/* Etiqueta flotante con nombre de especialidad */}
                <g transform={`translate(${pos.cx}, ${pos.cy - 30})`}>
                  <rect
                    x="-70"
                    y="-12"
                    width="140"
                    height="22"
                    rx="6"
                    fill={fixed ? '#E1EBD6' : '#FFF1DF'}
                    stroke={fixed ? '#3A6654' : '#A23823'}
                    strokeWidth="1.2"
                    strokeOpacity="0.3"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill="#191716"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    fontSize="11"
                    fontWeight="600"
                  >
                    {area.title}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Pie del mapa con instrucción clara y contador */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 bg-white/80 border-t border-[#191716]/10 text-xs text-[#191716]/80">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF5900]" aria-hidden="true" />
          <span>Toca una alerta para entrar a su misión</span>
        </div>
        <div className="font-mono-tech text-[11px] text-[#191716]/60">
          {repairedAreas.size === 6 ? (
            <span className="text-emerald-700 font-semibold">✓ Ciudad restaurada</span>
          ) : (
            <span>{6 - repairedAreas.size} incidentes activos</span>
          )}
        </div>
      </div>
    </div>
  );
};
