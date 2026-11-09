# Ciudad en Proyecto · Laboratorio Vocacional de Ingeniería Civil
### Universidad Anáhuac México · Campus Norte

Experiencia interactiva digital y táctil de orientación vocacional dirigida a estudiantes de 5.º de preparatoria con inclinación físico-matemática y de 6.º de Área 1.

---

## 🏗️ Propósito y Enfoque

- **Experiencia visual y tangible**: Una ciudad isométrica interactiva en 2.5D en lugar de formularios o folletos estáticos.
- **Sin registro ni datos personales**: Orientación inmediata, privada y sin fricción.
- **Selector pedagógico**: Alterna entre 5.º de prepa y 6.º de Área 1 para calibrar la profundidad conceptual (explicaciones cotidianas vs. variables físico-matemáticas como caudal pico $Q_{pico}$, capacidad de carga y saturación de suelo).
- **Identidad Anáhuac México**:
  - Escudo oficial Anáhuac íntegro desde recurso gráfico original (`LOGO_ANAHUAC_b64d5445.png`).
  - Paleta: Fondo marfil (`#FAF8F3`), Tinta carbón (`#191716`), Naranja institucional digital (`#FF5900`), Café institucional (`#6B3F23`) y acento teal desaturado para redes hídricas.

---

## 🏙️ Módulos de la Aplicación

1. **Maqueta Isométrica & Explorador de 6 Especialidades**:
   - Edificios con corte estructural, río urbano, puente atirantado, vialidades con aforo, zona de obra con grúa torre y techos verdes.
   - 6 zonas interactivas sincronizadas:
     1. **Estructuras**: Comportamiento ante cargas vivas, viento y sismo; diseño de marcos de acero y concreto.
     2. **Agua e Hidráulica**: Redes de distribución, colectores pluviales, presas y modelado de escorrentías.
     3. **Movilidad y Transporte**: Capacidad vial, sincronía semafórica, pavimentos de alta durabilidad y transporte masivo.
     4. **Suelos y Geotecnia**: Capacidad de carga del subsuelo, cimentaciones profundas, mecánica de suelos y taludes.
     5. **Construcción y Gestión**: Rendimientos de maquinaria, cronogramas de obra, presupuestos, seguridad y supervisión.
     6. **Infraestructura Sostenible**: Enfoque transversal en drenaje sustentable, resiliencia climática y eficiencia de materiales.
   - Panel lateral con problema real, jornada típica del ingeniero, materia del plan de estudios y proyección profesional.
   - Contador de zonas visitadas almacenado de forma local durante la sesión.

2. **Reto Interactivo: Simulador de Lluvia y Drenaje Urbano**:
   - Escenario de colonia urbana con pendiente hacia el colector principal.
   - Dos intensidades de lluvia: **Tormenta moderada** y **Tormenta intensa**.
   - Tres estrategias aplicables:
     - Pavimento permeable
     - Tanque de retención subterráneo
     - Ampliación del colector pluvial
   - Visualización animada de escorrentía y respuesta cualitativa con pros y limitaciones reales de cada técnica.
   - Pregunta de reflexión: "¿Qué medirías antes de tomar una decisión definitiva?".

3. **Comparador: Ingeniería Civil vs. Arquitectura**:
   - Dos proyectos ilustrativos reales:
     - **Centro Comunitario**
     - **Estación de Transporte Intermodal**
   - Análisis de preguntas clave, decisiones y entregables de cada disciplina.
   - Banda central de coordinación interdisciplinaria ("Lo que resuelven en equipo"), evidenciando el diálogo entre diseño espacial y viabilidad estructural.

4. **En Anáhuac · Plan de Estudios y Campus Norte**:
   - Programa oficial de 9 semestres.
   - Laboratorios de alta tecnología (Materiales y Mecánica de Fluidos).
   - Materias formativas troncales y enfoque de liderazgo ético y empresarial.
   - Enlace directo a Promoción Campus Norte.

5. **Panel "Guía" y Servidor API**:
   - 4 consultas directas predefinidas: `matematicas`, `campo`, `diferencias`, `campus`.
   - Endpoint backend: `POST /api/orientacion` con `{ tema, grado }`.
   - Si no hay secretos externos configurados (`APPS_SCRIPT_URL`, `APPS_SCRIPT_TOKEN`), el servidor y el cliente activan automáticamente el contenido editorial verificado con la etiqueta `"Respuesta de la guía · modo demostración"`.
   - Si se configuran los secretos, el servidor reenvía de forma segura al endpoint de Apps Script, sigue redirecciones HTTPS y valida la respuesta para desplegar `"Respuesta generada con IA"`.

---

## ⚙️ Configuración del Servidor

Variables de entorno en `.env`:
```bash
APPS_SCRIPT_URL="https://script.google.com/macros/s/.../exec"
APPS_SCRIPT_TOKEN="token_privado_de_seguridad"
```
El contrato esperado de Apps Script:
- Recibe POST JSON: `{ "tema": "matematicas", "grado": "5", "token": "..." }`
- Devuelve JSON: `{ "ok": true, "texto": "..." }`
