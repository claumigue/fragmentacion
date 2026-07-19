# Poética de la Fragmentación

**Diagrama cronológico de la fragmentación en literatura, cine, música y artes visuales (1897–2024).**

> **Traducciones:** [Español](README.es.md) | [English](README.md)

Un mapa interactivo que rastrea las estrategias de ruptura y discontinuidad a través de las disciplinas artísticas del siglo XX y XXI: del cubismo de Picasso a la musique concrète, de las vanguardias europeas al glitch art latinoamericano.

> 🌐 **Sitio en vivo:** [claumigue.github.io/fragmentacion](https://claumigue.github.io/fragmentacion)

---

## ✦ Stack tecnológico

| Capa          | Tecnología                                                                 |
| :------------ | :------------------------------------------------------------------------- |
| Framework     | **[Astro v6](https://astro.build)** (generador de sitios estáticos)        |
| Lenguaje      | **TypeScript** (scripts cliente) + **CSS** vainilla (sin frameworks UI)    |
| Bundler       | **Vite** (bajo el capó de Astro)                                           |
| PWA           | `@vite-pwa/astro` + `vite-plugin-pwa` (Workbox) — soporte offline básico   |
| Despliegue    | `gh-pages` → **GitHub Pages**                                              |
| Tipografía    | Google Fonts: Syne, DM Mono, Cormorant Garamond                            |
| Node          | `>=22.12.0`, npm                                                           |

---

## ✦ Características

### 🎯 Línea de tiempo interactiva
- Eje cronológico horizontal con **zoom ajustable** (60%–200%)
- **4 carriles** temáticos: Literatura, Cine, Música y Artes Visuales
- **35+ hitos** con nodos animados, emojis y colores por disciplina
- Bandas de época (Vanguardias → Digital & Experimental) con etiquetas
- Desplazamiento suave horizontal con scrollbar personalizada

### 🔍 Filtro por disciplina
- Botones en el header para filtrar eventos por disciplina
- Transiciones suaves con opacidad
- Distinción cromática: cada disciplina tiene su color (`--lit`, `--cin`, `--mus`, `--vis`)

### 🖼️ Modal de detalle
- Al hacer clic en cualquier nodo se abre un modal con:
  - Título, creador/a, año y disciplina
  - Descripción y cita textual
  - Etiquetas de conexiones interdisciplinarias
  - Enlace directo a Wikipedia
- Animación de entrada con escala y translación
- Cierre con clic fuera, botón × o tecla Escape

### 🔗 Conexiones interdisciplinarias
- Sección inferior que traza **genealogías de ideas** entre disciplinas
- Tarjetas con flecha direccional codificada por color
- Ejemplos: Cubismo → Collage literario, Dadá → Glitch art

### 🌗 Modo oscuro / claro
- Toggle en el header con animación de deslizamiento
- Persistencia en `localStorage`
- Script inline **anti-FOUC** que aplica el tema antes del primer pintado
- 40+ variables CSS que se intercambian al cambiar de tema

### 🖱️ Cursor personalizado
- Punto de acento que sigue al ratón en tiempo real
- Anillo secundario con interpolación suave (`requestAnimationFrame`)
- Efecto `mix-blend-mode: exclusion`
- Se agranda al pasar sobre nodos interactivos

### 🎨 Animaciones y micro-interacciones
- Entrada escalonada de letras del título (`FRAG·MENTACIÓN`) con rotación y desplazamiento
- Rejilla animada en el hero con _drift_ infinito
- Pulso radial al hoverear nodos
- Transiciones suaves en tema, filtros, modal y hover states
- _Scroll hint_ inicial que guía al usuario a explorar la línea de tiempo

### 📱 PWA + Responsive
- Service worker con `autoUpdate` para caché de assets
- Manifest webapp manual en `public/site.webmanifest`
- Diseño adaptable a móviles (header compacto, modal responsive, ocultación de etiquetas de época en viewports pequeños)

---

## ✦ Estructura del proyecto

```
/
├── public/                       # Assets estáticos (favicons, manifest PWA)
├── src/
│   ├── components/               # 6 componentes Astro
│   │   ├── Header.astro          #   Navegación + filtros + toggle de tema
│   │   ├── Hero.astro            #   Hero con animación de letras
│   │   ├── Timeline.astro        #   Línea de tiempo (renderizada en servidor)
│   │   ├── Connections.astro     #   Conexiones interdisciplinarias
│   │   ├── Modal.astro           #   Shell HTML del modal de detalle
│   │   └── Footer.astro          #   Pie de página
│   ├── data/                     # Datos estáticos en TypeScript
│   │   ├── events.ts             #   35+ eventos de la línea de tiempo
│   │   └── connections.ts        #   6 conexiones entre disciplinas
│   ├── layouts/
│   │   └── BaseLayout.astro      # Layout principal (meta, fuentes, anti-FOUC)
│   ├── scripts/                  # 6 módulos TypeScript (sin frameworks)
│   │   ├── main.ts               #   Entry point — inicializa todos los módulos
│   │   ├── theme.ts              #   Toggle oscuro/claro
│   │   ├── cursor.ts             #   Cursor personalizado
│   │   ├── filter.ts             #   Filtro por disciplina
│   │   ├── modal.ts              #   Modal de detalle
│   │   └── timeline.ts           #   Layout de timeline + zoom + scroll hint
│   ├── styles/
│   │   └── main.css              #   Único CSS (~1343 líneas, variables CSS)
│   └── pages/
│       └── index.astro           #   SPA de una sola página
├── astro.config.mjs              # Configuración de Astro + PWA
├── package.json
└── tsconfig.json
```

---

## ✦ Comandos

| Comando                   | Acción                                            |
| :------------------------ | :------------------------------------------------ |
| `npm install`             | Instala dependencias                              |
| `npm run dev`             | Inicia servidor local en `localhost:4321`         |
| `npm run build`           | Compila el sitio estático en `./dist/`            |
| `npm run preview`         | Previsualiza la build localmente                  |
| `npm run deploy`          | Despliega `./dist/` en GitHub Pages vía `gh-pages`|
| `npm run astro ...`       | Ejecuta comandos de Astro CLI                     |

---

## ✦ Datos

Los datos históricos están en `src/data/`:

- **`events.ts`** — 35+ eventos con año, disciplina, descripción, cita, etiquetas y enlace a Wikipedia.
- **`connections.ts`** — 6 conexiones que trazan relaciones genealógicas entre disciplinas.

Ambos archivos son tipados con TypeScript (`TimelineEvent` y `Connection`).

---

## ✦ Créditos

Proyecto desarrollado con [Astro](https://astro.build) y TypeScript. Diseño y contenido original sobre la poética de la fragmentación en las artes.

---

Proyecto · [claumigue.github.io/fragmentacion](https://claumigue.github.io/fragmentacion)
