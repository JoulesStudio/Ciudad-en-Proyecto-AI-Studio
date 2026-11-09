import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Crosshair, Radio, Wrench, Zap } from 'lucide-react';
import type { GradeLevel } from '../types';
import { AREAS_DATA } from '../data/areas';
import { CityMap } from './CityMap';

export const ZONE_IDS = ['estructuras', 'hidraulica', 'movilidad', 'geotecnia', 'construccion', 'sostenibilidad'] as const;
export type ZoneId = typeof ZONE_IDS[number];

type Teammate = { name: string; job: string; line: string; skin: string; helmet: string; kit: string; hair: 'short' | 'long'; glasses?: boolean };
type Puzzle = { prompt: string; hint: string; choices: [string, string, string]; answer: 0 | 1 | 2; retry: string };
type Zone = { tag: string; title: string; problem: string; restored: string; team: [Teammate, Teammate]; levels: Record<GradeLevel, Puzzle> };

const ZONES: Record<ZoneId, Zone> = {
  estructuras: {
    tag: 'TORRE / BLOQUE A', title: 'La torre quedó en alerta',
    problem: 'Después de un sismo aparecen grietas. El edificio permanece cerrado mientras el equipo revisa qué partes sufrieron daño.',
    restored: 'El equipo inspeccionó los elementos de soporte y reparó los dañados en este escenario. La torre vuelve a recibir gente tras la revisión.',
    team: [
      { name: 'Maya', job: 'Ingeniera estructural', line: 'Modelo cómo se mueve un edificio. Me encanta entender qué lo mantiene en pie.', skin: '#A66044', helmet: '#FF7A31', kit: '#215E67', hair: 'long', glasses: true },
      { name: 'Leo', job: 'Ingeniero de inspección', line: 'Reviso vigas y columnas en sitio. Me gusta encontrar las pistas que otros pasan por alto.', skin: '#E6AD7D', helmet: '#F7D087', kit: '#583722', hair: 'short' },
    ],
    levels: {
      '5': { prompt: '¿Qué deberían revisar antes de abrir la torre?', hint: 'Imagina que quitas una pata a una mesa. Importa dónde está el daño y qué sostiene esa pieza.', choices: ['Pintar las paredes para cubrir las grietas', 'Revisar vigas y columnas', 'Cambiar los letreros de entrada'], answer: 1, retry: 'Primero busca los elementos que sostienen la torre. El acabado se revisa después.' },
      '6': { prompt: 'El daño se concentra en un piso. ¿Qué dato ayuda a comparar cuánto se deformó con los demás?', hint: 'La deriva de entrepiso compara el desplazamiento horizontal relativo entre dos niveles con su altura.', choices: ['El desplazamiento relativo entre pisos vecinos y su altura', 'El ancho de la fachada', 'La altura total del edificio por sí sola'], answer: 0, retry: 'Necesitas comparar dos niveles contiguos. Una medida global puede ocultar una deformación concentrada.' },
    },
  },
  hidraulica: {
    tag: 'CANAL / BARRIO BAJO', title: 'El agua tomó la calle',
    problem: 'La lluvia llenó el canal y el cruce quedó bajo el agua. Hay que reducir la acumulación sin trasladar el problema al siguiente barrio.',
    restored: 'El equipo habilitó almacenamiento temporal y una salida controlada. En este escenario baja el agua del cruce sin descargarla toda de golpe.',
    team: [
      { name: 'Inés', job: 'Ingeniera hidráulica', line: 'Sigo el camino del agua en modelos. Me emociona cuando una solución protege a todo un barrio.', skin: '#E2A474', helmet: '#69BAC0', kit: '#873F2B', hair: 'long' },
      { name: 'Dani', job: 'Ingeniero de campo', line: 'Mido niveles en canales. Mi parte favorita es contrastar el modelo con lo que pasa afuera.', skin: '#794737', helmet: '#FF803F', kit: '#235B67', hair: 'short', glasses: true },
    ],
    levels: {
      '5': { prompt: 'El canal ya está lleno. ¿Cómo ganas tiempo mientras pasa la lluvia?', hint: 'Piensa en una tina que puede guardar agua y vaciarse poco a poco.', choices: ['Guardar parte del agua y soltarla despacio', 'Enviar más agua al canal de golpe', 'Tapar todas las coladeras'], answer: 0, retry: 'El canal ya está al límite. Busca una opción que evite que le llegue toda el agua al mismo tiempo.' },
      '6': { prompt: 'La entrada al tanque es de 8 L/s y la salida de 3 L/s. ¿Qué ocurre en ese instante?', hint: 'En este modelo, la tasa de cambio del volumen es caudal de entrada menos caudal de salida.', choices: ['El volumen disminuye 5 L por segundo', 'El volumen se mantiene', 'El volumen aumenta 5 L por segundo'], answer: 2, retry: 'Compara lo que entra con lo que sale. Si entra más, queda agua acumulada.' },
    },
  },
  movilidad: {
    tag: 'ESTACIÓN / CRUCE 03', title: 'El cruce se bloqueó',
    problem: 'Una fila de autobuses ocupa el paso peatonal. Los pasajeros necesitan una conexión segura entre los andenes.',
    restored: 'El equipo separó la espera de autobuses del cruce de peatones. La estación recuperó un recorrido despejado.',
    team: [
      { name: 'Nora', job: 'Ingeniera de transporte', line: 'Analizo cómo se mueve la gente. Me gusta recuperar minutos que miles de personas pierden al día.', skin: '#815041', helmet: '#F5BD59', kit: '#3D5551', hair: 'short', glasses: true },
      { name: 'Raúl', job: 'Ingeniero de vialidades', line: 'Diseño recorridos y giros. Me apasiona ver que una calle funciona mejor para quien va a pie.', skin: '#DA9762', helmet: '#F4EEE0', kit: '#934424', hair: 'short' },
    ],
    levels: {
      '5': { prompt: '¿Cómo proteges el paso de la gente que cambia de autobús?', hint: 'Mira dónde se juntan los trayectos. Un mismo espacio no puede ser fila de buses y cruce seguro a la vez.', choices: ['Hacer que la gente cruce entre los buses', 'Mover el cruce a cualquier lugar sin señalizar', 'Separar la fila de buses del paso peatonal'], answer: 2, retry: 'La gente debe poder cruzar sin meterse a la fila de vehículos. Busca una solución para ambos recorridos.' },
      '6': { prompt: 'Llegan 12 buses cada 10 minutos y salen 9. Si se mantiene el ritmo, ¿cuánto crece la fila en 20 minutos?', hint: 'Calcula el saldo de llegadas menos salidas para un intervalo y multiplícalo por dos.', choices: ['6 buses', '3 buses', '21 buses'], answer: 0, retry: 'La fila cambia por la diferencia, no por el total. Ve cuánto se acumula cada 10 minutos.' },
    },
  },
  geotecnia: {
    tag: 'TALUD / LADERA SUR', title: 'La ladera empezó a ceder',
    problem: 'Tras la lluvia, el terreno se ablanda y aparece una grieta junto al sendero. El paso se cierra para estudiar el suelo.',
    restored: 'El equipo estudió el suelo y controló el agua antes de estabilizar el talud. El sendero se reabre en el escenario.',
    team: [
      { name: 'Sol', job: 'Ingeniera geotécnica', line: 'Leo lo que hay bajo nuestros pies. Me fascina que dos suelos parecidos puedan comportarse distinto.', skin: '#BF7750', helmet: '#C6DD82', kit: '#72502E', hair: 'long' },
      { name: 'Iván', job: 'Ingeniero de laboratorio', line: 'Pruebo muestras de suelo. Me encanta que un puñado de tierra ayude a explicar lo que pasa en una ladera.', skin: '#EABD9C', helmet: '#FF9456', kit: '#315954', hair: 'short', glasses: true },
    ],
    levels: {
      '5': { prompt: '¿Qué harías antes de decidir cómo sostener la ladera?', hint: 'La tierra seca y el lodo reaccionan distinto. Averigua qué hay debajo y por dónde pasa el agua.', choices: ['Abrir el sendero porque dejó de llover', 'Tomar muestras y revisar la humedad del suelo', 'Cubrir la grieta con pintura'], answer: 1, retry: 'Una grieta tapada no nos dice si el terreno se puede seguir moviendo. Empieza con observaciones y muestras.' },
      '6': { prompt: 'Tras la lluvia aumenta la presión del agua en los poros. ¿Qué merece atención en el modelo?', hint: 'Esfuerzo efectivo = esfuerzo total menos presión de poros. Piensa en cuánto contacto queda entre granos.', choices: ['A igual esfuerzo total, baja el esfuerzo efectivo', 'A igual esfuerzo total, aumenta el esfuerzo efectivo', 'La presión de poros no cambia el esfuerzo efectivo'], answer: 0, retry: 'Usa la resta de la pista. Si el término que restas aumenta, el resultado baja.' },
    },
  },
  construccion: {
    tag: 'OBRA / PLAZA CENTRAL', title: 'La obra perdió el ritmo',
    problem: 'Llegaron materiales fuera de orden y un paso de trabajo está bloqueado. El equipo detiene esa zona y reorganiza el frente.',
    restored: 'El equipo despejó el acceso, reordenó las tareas y coordinó las entregas. El frente vuelve a trabajar con un recorrido claro.',
    team: [
      { name: 'Vale', job: 'Ingeniera residente de obra', line: 'Coordino a las personas y reviso la seguridad. Me encanta ver cómo un plano se vuelve un lugar real.', skin: '#A8705B', helmet: '#FF813B', kit: '#3E6660', hair: 'short' },
      { name: 'Emi', job: 'Ingeniero de planeación', line: 'Ordeno tareas, materiales y tiempos. Disfruto hacer que todo encaje antes de que llegue el primer camión.', skin: '#725044', helmet: '#F2D18F', kit: '#9B5031', hair: 'long', glasses: true },
    ],
    levels: {
      '5': { prompt: '¿Cuál es la primera decisión útil del equipo?', hint: 'Si el acceso está bloqueado, sumar más personas y materiales puede empeorar el problema.', choices: ['Mandar más camiones al mismo acceso', 'Dejar los materiales donde cayeron', 'Despejar el paso y reordenar las entregas'], answer: 2, retry: 'Antes de acelerar el trabajo, el equipo necesita recuperar un acceso seguro y ordenar qué entra primero.' },
      '6': { prompt: 'Preparar el paso toma 2 h. Luego se puede montar la estructura (3 h) y, al mismo tiempo, revisar materiales (1 h). ¿Cuándo termina el conjunto?', hint: 'Suma la tarea que va primero y la rama paralela más larga. Esa secuencia fija el tiempo mínimo.', choices: ['4 horas', '5 horas', '6 horas'], answer: 1, retry: 'Las dos últimas tareas pueden correr en paralelo. El conjunto acaba cuando termina la más larga de esas dos.' },
    },
  },
  sostenibilidad: {
    tag: 'PARQUE / DISTRITO VERDE', title: 'La plaza se volvió un charco',
    problem: 'La plaza tiene mucho pavimento duro. La lluvia corre hacia los accesos y el sol calienta las zonas de espera.',
    restored: 'El equipo agregó sombra y un jardín de lluvia en esta maqueta. Parte del agua se retiene y aparecen espacios más frescos.',
    team: [
      { name: 'Luz', job: 'Ingeniera de infraestructura sostenible', line: 'Comparo materiales y estrategias para usar mejor el agua. Me apasiona devolverle vida a lugares muy duros.', skin: '#E3A27C', helmet: '#B9D271', kit: '#316453', hair: 'long', glasses: true },
      { name: 'Sam', job: 'Ingeniero de drenaje urbano', line: 'Diseño cómo entra y sale el agua de un espacio. Me gusta que un jardín también pueda resolver un problema.', skin: '#875144', helmet: '#FFD68B', kit: '#8B502C', hair: 'short' },
    ],
    levels: {
      '5': { prompt: '¿Qué cambio ayuda a la vez con el agua y con el calor?', hint: 'Busca algo que reciba parte del agua y dé sombra al lugar donde espera la gente.', choices: ['Un jardín de lluvia y árboles de sombra', 'Más pavimento oscuro', 'Cubrir la plaza con láminas transparentes'], answer: 0, retry: 'Compara dos beneficios: captar parte de la lluvia y proteger del sol. La opción debe ayudar con ambos.' },
      '6': { prompt: 'En un modelo sencillo caen 10 mm de lluvia sobre 100 m². ¿Qué volumen recibe esa superficie antes de que infiltre agua?', hint: 'Convierte 10 mm a 0.01 m y multiplica por el área. Cada metro cúbico equivale a 1,000 litros.', choices: ['100 litros', '10,000 litros', '1,000 litros'], answer: 2, retry: 'Primero calcula el volumen en metros cúbicos. Después conviértelo a litros.' },
    },
  },
};

const width = 'mx-auto max-w-[1220px] px-4 sm:px-7';
const micro = 'font-mono-tech text-[11px] font-bold uppercase tracking-[0.12em]';
const action = 'inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md border border-[#191716] bg-[#FF681E] px-4 py-2.5 text-sm font-extrabold text-[#191716] shadow-[3px_3px_0_#8F3813] transition-colors hover:bg-[#FF8C52] disabled:cursor-not-allowed disabled:border-[#766257] disabled:bg-[#DBD1C6] disabled:shadow-none';
const back = 'inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-[#693618] underline-offset-4 hover:underline';

function CrewArt({ person }: { person: Teammate }) {
  return (
    <g stroke="#251D19" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="32" cy="82" rx="24" ry="4" fill="#251D19" opacity=".2" stroke="none" />
      {person.hair === 'long' && <path d="M15 27q-5 17-3 22h39q2-12-4-24Z" fill="#30251F" />}
      <path d="M19 63h26l4 17H34l-2-8-3 8H15Z" fill="#332D2B" />
      <path d="M19 45 9 53l-3 10 8 4 7-9-1 10h24l-1-10 7 8 7-5-4-9-8-7Z" fill={person.kit} />
      <path d="m24 46 5 15h6l5-15m-20 17h24" fill="none" stroke="#FFD59A" />
      <path d="M15 27q-4-9 6-12 12-7 24 2 6 2 4 12" fill="#332420" />
      <path d="M17 24h31v10q-2 14-16 14-12 0-15-13Z" fill={person.skin} />
      <path d="M23 33h1m15 0h1m-14 7q5 4 11-1" fill="none" />
      {person.glasses && <path d="M19 29h10v8H19Zm16 0h10v8H35Zm-6 3h6" fill="none" strokeWidth="1.5" />}
      <path d="M14 23v-4Q16 6 31 6q15 0 19 14v3M10 24l43-1v5H10Z" fill={person.helmet} />
      <path d="M29 8v12" fill="none" stroke="#FFF1D6" />
    </g>
  );
}

function Portrait({ person }: { person: Teammate }) {
  return <svg aria-hidden="true" className="h-[70px] w-[54px] shrink-0" viewBox="0 0 64 86"><CrewArt person={person} /></svg>;
}

function ZoneScene({ id, restored }: { id: ZoneId; restored: boolean }) {
  const zone = ZONES[id];
  return (
    <svg role="img" aria-label={`${restored ? 'Zona reparada' : 'Zona dañada'}. ${restored ? zone.restored : zone.problem}`}
      viewBox="0 0 640 302" className="block h-auto w-full">
      <defs>
        <pattern id="mission-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0v24" fill="none" stroke="#614D3C" strokeOpacity=".12" /></pattern>
      </defs>
      <rect width="640" height="302" fill={restored ? '#F8E9C7' : '#DCD1C3'} />
      <circle cx="504" cy="68" r="33" fill={restored ? '#F6BB5E' : '#B3A39B'} />
      <path d="M0 140h55v-17h43v-16h34v23h39V99h22v20h29v24h42v-26h34v13h40V91h38v40h24v-14h42v25h42v-29h25v-14h24v31h36v-13h41v24h30v87H0Z" fill={restored ? '#DCC8A7' : '#B9A99C'} />
      <path d="M31 219 208 152h298l112 73-171 67H155Z" fill={restored ? '#E2BE8F' : '#A99684'} stroke="#403029" strokeWidth="2" />
      <path d="M31 219 155 292h292l171-67v14l-171 63H155L31 234Z" fill={restored ? '#9F7654' : '#776355'} stroke="#403029" strokeWidth="2" />
      <rect width="640" height="302" fill="url(#mission-grid)" />
      {id === 'estructuras' && <g stroke="#3C302A" strokeWidth="3" strokeLinejoin="round">
        <path d="m206 209 114-44 160 24-99 52Z" fill="#654C3F" opacity=".25" stroke="none" />
        <path d="m237 56 69-25 80 27-73 28Z" fill={restored ? '#FFD59D' : '#A78F82'} />
        <path d="M237 56v146l76 36V86Z" fill={restored ? '#E9B575' : '#B0998A'} />
        <path d="m313 86 73-28v144l-73 36Z" fill={restored ? '#FFF3D7' : '#D2BCAB'} />
        {[0,1,2,3].map(n => <path key={n} d={`M327 ${98+n*27}l44-18v12l-44 19Z`} fill={restored ? '#529C92' : '#847A72'} strokeWidth="1.8" />)}
        {restored ? <><path d="m245 90 55 27-55 28 55 27-55 28" fill="none" stroke="#774527" strokeWidth="6" /><path d="m330 229 45-20 43 15-49 21Z" fill="#668B60" /></> : <><path d="m260 71-6 32 20 9-13 17 18 15-10 37 20 30" fill="none" stroke="#A83422" strokeWidth="6" /><path d="m190 223 61 19m-61-8 61 19m-59-39v26m58-9v26" stroke="#B84D23" strokeWidth="6" /></>}
      </g>}
      {id === 'hidraulica' && <g stroke="#3C302A" strokeWidth="2.6">
        <path d="m346 153 87 7 100 85-106 31-95-104Z" fill={restored ? '#439C9B' : '#486E72'} />
        <path d="m119 204 408-20 41 25-420 27Z" fill="#393738" />
        <path d="m141 218 405-22" stroke="#F3DFB6" strokeDasharray="14 10" />
        <path d="m214 168 57-20 54 17-57 22Z" fill="#B06648" /><path d="M214 168v42l54 13v-36Zm54 19 57-22v42l-57 16Z" fill="#F3D1A6" />
        {restored ? <><path d="m371 220 40-17 60 31-50 19Z" fill="#225D6A" /><path d="m374 220 47 29 51-16" fill="none" stroke="#B1DBCF" strokeWidth="5" /><path d="m156 211 30-2 10 9-30 3Z" fill="#F48035" /></> : <><path d="M134 208q57-22 110-4t103-8q49-23 124-2t77 34q-53 18-118 7t-155 16q-80 11-142-17-17-13 1-26Z" fill="#517F87" opacity=".89" /><path d="M161 226q35-9 66 0m44-9q35-10 70-4m72 3q45 7 83-3" fill="none" stroke="#BBD5CB" strokeWidth="3" /></>}
      </g>}
      {id === 'movilidad' && <g stroke="#3C302A" strokeWidth="2.5" strokeLinejoin="round">
        <path d="m95 218 405-56 77 47-407 66Z" fill="#3C3E40" />
        <path d="m139 240 399-60" stroke="#FFDF9C" strokeDasharray="13 12" />
        <path d="M280 176 399 140l76 21-125 43Z" fill="#F4E4C1" /><path d="M305 181v33m114-62v37m27-26v34" strokeWidth="6" />
        <path d="m278 198 11 4-46 53-12-6Zm16-6 11 4-46 53-12-5Zm17-5 10 4-46 52-11-5Z" fill="#FFF4DA" stroke="none" />
        {(restored ? [399,481] : [158,232,292]).map((x,i) => <g key={x} transform={`translate(${x} ${restored ? 201-i*10 : 231-i*11})`}><path d="m0 0 58-8 14 8-59 10Z" fill={i===1?'#D9A344':'#EC762F'} /><path d="M0 0v15l13 10V10l59-10v15l-59 10" fill="#AB5B36" /><path d="m19 13 44-7v6l-44 7Z" fill="#34474C" /></g>)}
        {restored ? <><path d="m209 221 61-10m-8-5 10 5-6 9" fill="none" stroke="#87BC83" strokeWidth="5" /><circle cx="273" cy="201" r="7" fill="#70AF6F" /></> : <path d="m208 218 74-11m-72 21 74-11m-73-17 2 34m70-45 1 34" fill="none" stroke="#E35A30" strokeWidth="6" />}
      </g>}
      {id === 'geotecnia' && <g stroke="#493426" strokeWidth="3" strokeLinejoin="round">
        <path d={restored?'M150 232l28-34 69-17 19-30 92-21 110 42 20 48-151 51Z':'M150 232l58-66 66-10 19-24 66 9 104 19 30 61-156 48Z'} fill={restored?'#9F8157':'#9A674A'} />
        {restored ? <><path d="m177 224 80-22 84 19 131-42m-272 15 80-22 58 12 107-31m-239 94 74-21 62 12 127-41" fill="none" stroke="#E2B982" strokeWidth="7" /><path d="m178 216 47-11m101 14 41-13m18-48 39 9m-160 61 43 8" stroke="#648955" strokeWidth="12" /></> : <><path d="m308 138-20 28 27 13-20 24 23 19-18 35m-71-65 14 13-15 17-17-2Zm128 26 16 9-5 14-28 1Z" fill="none" stroke="#A52F22" strokeWidth="6" /><path d="m115 232 65 12m-64-24 61 11m-60-20v31m61-23v34" stroke="#E66335" strokeWidth="5" /></>}
      </g>}
      {id === 'construccion' && <g stroke="#4D382B" strokeWidth="3" strokeLinejoin="round">
        <path d="m166 216 165-53 165 51-167 52Z" fill="#BF9771" />
        <path d="M355 199V58h15v144m-15-133L239 89l16-21 115-20 88 37-8 8-88-29m5 16v39m54-37v48" fill="#F28A37" />
        <path d="M418 127h10v9h-10" fill="#C77C2F" />
        {(restored ? [[200,203,0],[236,191,0],[271,180,0]] : [[221,203,-24],[250,207,15],[269,214,37]]).map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M0 0 28-7l16 7-27 8Z" fill="#E8AE62"/><path d="M0 0v17l17 8V8L44 0v17l-27 8" fill="#A46942" /></g>)}
        {restored ? <path d="m174 232 143 13 142-44m-22 1 22-1-10 11" fill="none" stroke="#EDF1B7" strokeWidth="7" /> : <path d="m145 229 126 23m-125-11 121 21m-117-43v30m118-9v30" stroke="#B64528" strokeWidth="6" />}
      </g>}
      {id === 'sostenibilidad' && <g stroke="#48392E" strokeWidth="2.5" strokeLinejoin="round">
        <path d="m160 215 155-63 169 56-161 68Z" fill={restored?'#B9B67D':'#8A8177'} />
        <path d="m181 224 125-48 153 41m-239 32 129-50m-94 61 131-49" fill="none" stroke={restored?'#E5CEA2':'#AA9D8D'} strokeWidth="3" />
        {restored ? <><path d="M246 212q31-29 68-21l91 20-53 32q-34 12-79-2Z" fill="#548151" /><path d="M284 221q44-24 85-5l-32 17Z" fill="#5FA7A0" />{[[215,183],[381,163],[445,204]].map(([x,y])=><g key={x} transform={`translate(${x} ${y})`}><path d="M0 0v42" stroke="#735034" strokeWidth="7" /><circle cy="-1" r="24" fill="#769E56" /><circle cx="-7" cy="-7" r="13" fill="#99B76B" stroke="none" /></g>)}</> : <><path d="M226 219q33-29 97-18t109 21q-48 35-134 30-63-5-72-33Z" fill="#668587" /><path d="M247 228q38-10 67-5m22 11q43 2 64-5" fill="none" stroke="#9EBAB4" strokeWidth="3" /><path d="m192 186 85-21 15 7-82 26Z" fill="#87746C" /></>}
      </g>}
      {!restored && <g transform="translate(534 222)"><path d="M0-21 22 18h-44Z" fill="#E26A38" stroke="#4D2419" strokeWidth="2.5" /><path d="M0-9V4m0 7v1" stroke="#241913" strokeWidth="4" strokeLinecap="round" /></g>}
      <g key={String(restored)} className={restored ? 'motion-safe:animate-[zone-arrive_.65s_ease-out_both]' : undefined}>
        <g transform="translate(60 181) scale(1.05)"><CrewArt person={zone.team[0]} /></g>
        <g transform="translate(108 191) scale(.92)"><CrewArt person={zone.team[1]} /></g>
      </g>
      {restored && <g transform="translate(553 66)"><circle r="20" fill="#2E6656"/><path d="m-8 0 5 6 11-12" fill="none" stroke="#F7EFDA" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></g>}
    </svg>
  );
}

export function GradeSwitch({ grade, onChange }: { grade: GradeLevel; onChange: (grade: GradeLevel) => void }) {
  return (
    <div role="group" aria-label="Nivel de la misión" className="flex shrink-0 gap-1 rounded-lg border border-[#CDBAAB] bg-[#F1E6DA] p-1">
      <button type="button" aria-label="5.º de prepa" aria-pressed={grade === '5'} onClick={() => onChange('5')}
        className={`min-h-[44px] rounded px-2.5 text-xs font-extrabold ${grade === '5' ? 'bg-[#191716] text-white' : 'text-[#512E1E] hover:bg-[#E3D0C1]'}`}>5.º <span className="hidden sm:inline">de prepa</span></button>
      <button type="button" aria-label="6.º · Área 1" aria-pressed={grade === '6'} onClick={() => onChange('6')}
        className={`min-h-[44px] rounded px-2.5 text-xs font-extrabold ${grade === '6' ? 'bg-[#191716] text-white' : 'text-[#512E1E] hover:bg-[#E3D0C1]'}`}>6.º <span className="hidden sm:inline">· Área 1</span></button>
    </div>
  );
}

export function Dashboard({ grade, onGrade, repaired, onOpen, onReset }: {
  grade: GradeLevel;
  onGrade: (grade: GradeLevel) => void;
  repaired: ReadonlySet<ZoneId>;
  onOpen: (id: string) => void;
  onReset: () => void;
}) {
  const allRepaired = repaired.size === ZONE_IDS.length;
  return (
    <section id="mapa" className="bg-[#EFE5D7]">
      <div className="border-b-4 border-[#FF681E] bg-[#191716] text-[#FFF6E7]"
        style={{ backgroundImage: 'linear-gradient(#352A23 1px,transparent 1px),linear-gradient(90deg,#352A23 1px,transparent 1px)', backgroundSize: '27px 27px' }}>
        <div className={width + ' grid items-end gap-4 py-6 sm:gap-7 sm:py-10 lg:grid-cols-[1fr_auto]'}>
          <div>
            <p className={micro + ' mb-2 flex items-center gap-2 text-[#FFBB91]'}><Radio size={15} aria-hidden="true" /> Ciudad en Proyecto / Turno 01</p>
            <h1 className="max-w-[21ch] text-[clamp(2.15rem,6.5vw,4.5rem)] font-black leading-[.96] tracking-[-.06em]">
              {allRepaired ? <>La ciudad <span className="text-[#C4DE94]">volvió a la vida.</span></> : <>La ciudad <span className="text-[#FF7D37]">necesita a tu equipo.</span></>}
            </h1>
            <p className="mt-3 max-w-lg text-sm text-[#F0DAC7] sm:text-base">{allRepaired ? 'Seis equipos, seis formas de hacer Ingeniería Civil.' : 'Toca una alerta, conoce al equipo y toma una decisión para reparar la zona.'}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border border-[#675145] bg-[#2C221D] px-3 py-2.5 lg:min-w-68">
            <div>
              <p className={micro + ' text-[#FFBB91]'}>Estado de la ciudad</p>
              <p className="mt-0.5 text-sm font-bold" aria-live="polite">{repaired.size}/6 zonas reparadas <span className="ml-2 text-[#F7B375]">· {repaired.size * 60} XP</span></p>
            </div>
            {allRepaired && <Check size={25} className="text-[#C4DE94]" aria-hidden="true" />}
          </div>
        </div>
      </div>

      <div className={width + ' py-5 sm:py-8'}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className={micro + ' flex items-center gap-2 text-[#874722]'}><Crosshair size={16} aria-hidden="true" /> Tablero de incidentes</p>
            <p className="mt-1 text-xs font-semibold text-[#674833]">{grade === '5' ? '5.º de prepa · pistas con ejemplos' : '6.º · Área 1 · pistas con datos y física'}</p>
          </div>
          <GradeSwitch grade={grade} onChange={onGrade} />
        </div>
        <div className="grid items-start gap-4 lg:grid-cols-[1.58fr_1fr]">
          <CityMap onSelectArea={onOpen} repairedAreas={repaired} />
          <nav aria-label="Misiones por zona" className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {AREAS_DATA.map(area => {
              const complete = repaired.has(area.id as ZoneId);
              return (
                <a key={area.id} href={`#zona/${area.id}`}
                  className={`flex min-h-[68px] items-center gap-2 rounded-lg border p-2.5 text-left transition-colors sm:p-3 ${complete ? 'border-[#6F937F] bg-[#E4EDDA] hover:bg-[#D0E5CD]' : 'border-[#C5A98F] bg-[#FBF5E9] hover:border-[#A74119] hover:bg-[#FBE4CC]'}`}>
                  <span className={`grid size-8 shrink-0 place-items-center rounded font-mono-tech text-[11px] font-extrabold ${complete ? 'bg-[#2B6252] text-white' : 'bg-[#9F3822] text-[#FFF3DF]'}`}>{complete ? <Check size={16} aria-hidden="true" /> : area.number}</span>
                  <span className="min-w-0 flex-1"><strong className="block text-xs leading-tight sm:text-sm">{area.title}</strong><span className={micro + ' mt-1 block ' + (complete ? 'text-[#305B4C]' : 'text-[#863819]')}>{complete ? 'Reparada' : 'En alerta'}</span></span>
                  <ChevronRight size={15} className="hidden shrink-0 sm:block" aria-hidden="true" />
                </a>
              );
            })}
          </nav>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-[#CBB29B] pt-2">
          <a href="#mision-lluvia" className={back}>Simulador de lluvia <ArrowRight size={15} aria-hidden="true" /></a>
          <a href="#mision-equipo" className={back}>Civil y Arquitectura <ArrowRight size={15} aria-hidden="true" /></a>
          <a href="#explorar" className={back}>Fichas de las áreas <ArrowRight size={15} aria-hidden="true" /></a>
          {repaired.size > 0 && <button type="button" onClick={onReset} className={back + ' sm:ml-auto'}>Reiniciar turno</button>}
        </div>
      </div>
    </section>
  );
}

export function ZoneMission({ id, grade, onGrade, repaired, onRepair }: {
  id: ZoneId;
  grade: GradeLevel;
  onGrade: (grade: GradeLevel) => void;
  repaired: boolean;
  onRepair: () => void;
}) {
  const zone = ZONES[id];
  const puzzle = zone.levels[grade];
  const area = AREAS_DATA.find(item => item.id === id)!;
  const scene = useRef<HTMLElement>(null);
  const decision = useRef<HTMLHeadingElement>(null);
  const [choice, setChoice] = useState<number | null>(null);
  const [retry, setRetry] = useState(false);
  const [compareBefore, setCompareBefore] = useState(false);
  const [practice, setPractice] = useState(false);
  const canDecide = !repaired || practice;
  const displayRestored = repaired && !compareBefore;

  useEffect(() => {
    setChoice(null);
    setRetry(false);
  }, [grade]);

  function focusDecision() {
    decision.current?.scrollIntoView({ block: 'start' });
    decision.current?.focus({ preventScroll: true });
  }

  function tryAgain(nextGrade: GradeLevel) {
    onGrade(nextGrade);
    setChoice(null);
    setRetry(false);
    setPractice(true);
    requestAnimationFrame(focusDecision);
  }

  function dispatch() {
    if (choice === null || !canDecide) return;
    if (choice !== puzzle.answer) {
      setRetry(true);
      return;
    }
    if (repaired) {
      setPractice(false);
      setCompareBefore(false);
    } else {
      onRepair();
    }
    requestAnimationFrame(() => {
      scene.current?.scrollIntoView({ block: 'start' });
      scene.current?.focus({ preventScroll: true });
    });
  }

  return (
    <section className="min-h-[70vh] bg-[#EFE5D7]">
      <div className="sticky top-20 z-30 border-b border-[#D3BCA8] bg-[#FBF2E4]">
        <div className={width + ' flex items-center justify-between gap-2 py-1'}>
          <a href="#mapa" className={back}><ArrowLeft size={16} aria-hidden="true" /> Volver al mapa</a>
          <GradeSwitch grade={grade} onChange={nextGrade => {
            if (repaired && nextGrade !== grade) tryAgain(nextGrade);
            else onGrade(nextGrade);
          }} />
        </div>
      </div>
      <div className={width + ' py-5 sm:py-8'}>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
          <div>
            <p className={micro + ' flex items-center gap-1.5 text-[#874722]'}><Radio size={14} aria-hidden="true" /> Zona {area.number} / {area.title}</p>
            <h1 className="mt-1 text-3xl font-black leading-[1.04] tracking-[-.045em] sm:text-5xl">{repaired ? 'Misión resuelta' : zone.title}</h1>
          </div>
          {canDecide && <button type="button" className={back} onClick={focusDecision}>Ir a la decisión <ArrowRight size={15} aria-hidden="true" /></button>}
        </div>
        <div className="grid items-start gap-4 lg:grid-cols-[1.25fr_1fr]">
          <figure ref={scene} tabIndex={-1} className="scroll-mt-36 overflow-hidden rounded-xl border border-[#906F57] bg-[#FCF3E5] shadow-[3px_3px_0_#CDB49C]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#906F57] bg-[#2B211C] px-3 py-2.5 text-[#FFF4E3]">
              <span className={micro + ' text-[#FFC49D]'}>{zone.tag}</span>
              <span className={micro + ' rounded px-2 py-1 ' + (displayRestored ? 'bg-[#C5E3C3] text-[#254C43]' : 'bg-[#F3AA7F] text-[#4E2719]')}>{displayRestored ? 'Zona reparada' : 'Daño activo'}</span>
            </div>
            <ZoneScene id={id} restored={displayRestored} />
            <figcaption className="p-3 text-sm leading-relaxed sm:p-4" aria-live="polite">
              {displayRestored && <strong className="mb-1 flex items-center gap-1.5 text-[#305B4C]"><Check size={17} aria-hidden="true" /> Equipo desplegado · 60 XP</strong>}
              <span>{displayRestored ? zone.restored : zone.problem}</span>
              {repaired && <button type="button" onClick={() => setCompareBefore(value => !value)} className={back + ' mt-1 block'}>{compareBefore ? 'Ver después' : 'Ver antes'}</button>}
            </figcaption>
          </figure>

          <div className="grid gap-3">
            <div className="rounded-xl border border-[#C7A98F] bg-[#FFF8EA] p-3 sm:p-4">
              <h2 className={micro + ' mb-2 text-[#874722]'}>Equipo en escena</h2>
              <div className="grid gap-2">
                {zone.team.map(person => (
                  <article key={person.name} className="flex items-center gap-2 rounded-lg bg-[#F1E4D5] px-2 py-1.5 sm:gap-3 sm:px-3">
                    <Portrait person={person} />
                    <div><h3 className="text-sm font-extrabold">{person.name} <span className="font-semibold text-[#795138]">· {person.job}</span></h3><p className="mt-0.5 text-xs leading-relaxed text-[#382922] sm:text-sm">“{person.line}”</p></div>
                  </article>
                ))}
              </div>
            </div>
            {!canDecide ? (
              <div className="rounded-xl border border-[#88A188] bg-[#E2ECDA] p-4 text-[#234D41]">
                <strong>La zona ya cambió en el mapa.</strong>
                <p className="mt-1 text-sm">Elige otro incidente para seguir recuperando la ciudad.</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <a href="#mapa" className={action}>Volver al tablero <ArrowRight size={16} aria-hidden="true" /></a>
                  <button type="button" onClick={() => tryAgain(grade)} className={back}>Volver a practicar</button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-[#574035] bg-[#2A201A] p-3 text-[#FFF5E8] sm:p-4">
                <p className={micro + ' mb-1 flex items-center gap-1.5 text-[#FFBE94]'}><Zap size={14} aria-hidden="true" /> {grade === '5' ? '5.º de prepa / Decide con una pista' : '6.º · Área 1 / Analiza el dato'}{practice ? ' · Práctica' : ''}</p>
                <h2 ref={decision} tabIndex={-1} className="scroll-mt-36 text-xl font-black leading-tight sm:text-2xl">{puzzle.prompt}</h2>
                <p className="mt-2 border-l-2 border-[#FF8D55] bg-[#423028] px-2.5 py-2 text-sm leading-relaxed text-[#FFF0DA]"><strong>Pista.</strong> {puzzle.hint}</p>
                <div role="group" aria-label="Elige una respuesta" className="mt-3 grid gap-1.5">
                  {puzzle.choices.map((option, index) => (
                    <button type="button" key={option} aria-pressed={choice === index}
                      onClick={() => { setChoice(index); setRetry(false); }}
                      className={`min-h-[44px] rounded-md border px-2.5 py-2 text-left text-sm font-semibold ${choice === index ? 'border-[#FFD09D] bg-[#FFBC85] text-[#261A15]' : 'border-[#7E6152] bg-[#362820] hover:border-[#F8B68A]'}`}>
                      <span className="mr-2 font-mono-tech text-xs" aria-hidden="true">{String.fromCharCode(65 + index)}</span>{option}
                    </button>
                  ))}
                </div>
                <button type="button" disabled={choice === null} onClick={dispatch} className={action + ' mt-3'}><Wrench size={16} aria-hidden="true" /> Enviar al equipo</button>
                {retry && <p role="status" className="mt-2 text-sm text-[#FFE1C2]">{puzzle.retry}</p>}
              </div>
            )}
          </div>
        </div>
        <p className="mt-5 text-xs text-[#5F4637]">Misión ilustrativa · Personajes ficticios · Caso simplificado</p>
      </div>
    </section>
  );
}
