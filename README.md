# Poetics of Fragmentation

**A chronological diagram of fragmentation in literature, cinema, music, and visual arts (1897–2024).**

> **Translations:** [Español](README.es.md) | [English](README.md)

An interactive map tracing the strategies of rupture and discontinuity across 20th and 21st century artistic disciplines — from Picasso's Cubism to musique concrète, from the European avant-gardes to Latin American glitch art.

> 🌐 **Live site:** [claumigue.github.io/fragmentacion](https://claumigue.github.io/fragmentacion)

---

## ✦ Tech Stack

| Layer         | Technology                                                                |
| :------------ | :------------------------------------------------------------------------ |
| Framework     | **[Astro v6](https://astro.build)** (static site generator)               |
| Language      | **TypeScript** (client scripts) + vanilla **CSS** (no UI frameworks)      |
| Bundler       | **Vite** (under the hood of Astro)                                        |
| PWA           | `@vite-pwa/astro` + `vite-plugin-pwa` (Workbox) — basic offline support   |
| Deployment    | `gh-pages` → **GitHub Pages**                                             |
| Typography    | Google Fonts: Syne, DM Mono, Cormorant Garamond                           |
| Node          | `>=22.12.0`, npm                                                          |

---

## ✦ Features

### 🎯 Interactive Timeline
- Horizontal chronological axis with **adjustable zoom** (60%–200%)
- **4 thematic tracks**: Literature, Cinema, Music, and Visual Arts
- **35+ milestones** with animated nodes, emoji icons, and discipline-coded colors
- Era bands (Avant-Gardes → Digital & Experimental) with labels
- Smooth horizontal scrolling with custom scrollbar

### 🔍 Discipline Filter
- Header buttons to filter events by discipline
- Smooth opacity transitions
- Chromatic distinction: each discipline has its own CSS variable (`--lit`, `--cin`, `--mus`, `--vis`)

### 🖼️ Detail Modal
- Click any node to open a detail modal displaying:
  - Title, creator, year, and discipline
  - Description and textual quote
  - Interdisciplinary connection tags
  - Direct link to Wikipedia
- Entry animation with scale and translation
- Close by clicking outside, pressing ×, or the Escape key

### 🔗 Interdisciplinary Connections
- Bottom section tracing **genealogies of ideas** across disciplines
- Cards with direction arrow color-coded by discipline
- Examples: Cubism → Literary Collage, Dada → Glitch Art

### 🌗 Dark / Light Mode
- Header toggle with sliding animation
- `localStorage` persistence
- Inline **anti-FOUC** script that applies the theme before first paint
- 40+ CSS variables swapped on theme switch

### 🖱️ Custom Cursor
- Accent dot following the mouse in real time
- Secondary ring with smooth interpolation (`requestAnimationFrame`)
- `mix-blend-mode: exclusion` effect
- Grows larger when hovering over interactive nodes

### 🎨 Animations & Micro-interactions
- Staggered letter entrance for the title (`FRAG·MENTACIÓN`) with rotation and translation
- Animated grid in the hero section with infinite drift
- Radial pulse on node hover
- Smooth transitions on theme, filters, modal, and hover states
- Initial scroll hint guiding users to explore the timeline

### 📱 PWA + Responsive
- Service worker with `autoUpdate` for asset caching
- Manual webapp manifest at `public/site.webmanifest`
- Mobile-adaptive design (compact header, responsive modal, hidden era labels on small viewports)

---

## ✦ Project Structure

```
/
├── public/                       # Static assets (favicons, PWA manifest)
├── src/
│   ├── components/               # 6 Astro components
│   │   ├── Header.astro          #   Navigation + filters + theme toggle
│   │   ├── Hero.astro            #   Hero with animated lettering
│   │   ├── Timeline.astro        #   Timeline (server-rendered)
│   │   ├── Connections.astro     #   Interdisciplinary connections
│   │   ├── Modal.astro           #   HTML shell for the detail modal
│   │   └── Footer.astro          #   Page footer
│   ├── data/                     # Static data in TypeScript
│   │   ├── events.ts             #   35+ timeline events
│   │   └── connections.ts        #   6 cross-disciplinary connections
│   ├── layouts/
│   │   └── BaseLayout.astro      # Main layout (meta, fonts, anti-FOUC)
│   ├── scripts/                  # 6 TypeScript modules (framework-free)
│   │   ├── main.ts               #   Entry point — initializes all modules
│   │   ├── theme.ts              #   Dark/light toggle
│   │   ├── cursor.ts             #   Custom cursor
│   │   ├── filter.ts             #   Discipline filter
│   │   ├── modal.ts              #   Detail modal
│   │   └── timeline.ts           #   Timeline layout + zoom + scroll hint
│   ├── styles/
│   │   └── main.css              #   Single CSS file (~1343 lines, CSS variables)
│   └── pages/
│       └── index.astro           #   Single-page application
├── astro.config.mjs              # Astro + PWA configuration
├── package.json
└── tsconfig.json
```

---

## ✦ Commands

| Command                   | Action                                            |
| :------------------------ | :------------------------------------------------ |
| `npm install`             | Install dependencies                              |
| `npm run dev`             | Start local dev server at `localhost:4321`        |
| `npm run build`           | Build the static site to `./dist/`                |
| `npm run preview`         | Preview the build locally                         |
| `npm run deploy`          | Deploy `./dist/` to GitHub Pages via `gh-pages`   |
| `npm run astro ...`       | Run Astro CLI commands                            |

---

## ✦ Data

Historical data lives in `src/data/`:

- **`events.ts`** — 35+ events with year, discipline, description, quote, tags, and Wikipedia link.
- **`connections.ts`** — 6 connections tracing genealogical relationships across disciplines.

Both files are fully typed with TypeScript (`TimelineEvent` and `Connection` interfaces).

---

## ✦ Credits

Built with [Astro](https://astro.build) and TypeScript. Original design and content on the poetics of fragmentation in the arts.

---

Project · [claumigue.github.io/fragmentacion](https://claumigue.github.io/fragmentacion)
