# Continue Guide — Fragmentación

## 1. Project Overview

**Poética de la Fragmentación** is a Spanish-language, single-page interactive chronology of fragmentation and discontinuity in literature, cinema, music, and visual arts. The timeline covers historical milestones from 1897 through 2024 and connects them through short interdisciplinary genealogies.

### Technology

- **Astro 6** with static output (`output: 'static'`)
- **TypeScript** for browser behavior, with no UI framework
- **Vanilla CSS** in one central stylesheet using CSS custom properties
- **Vite** through Astro
- **PWA** integration via `@vite-pwa/astro` and Workbox
- **npm** and Node.js `>=22.12.0`
- **GitHub Pages** deployment using `gh-pages`
- Google Fonts: Syne, DM Mono, and Cormorant Garamond

### Architecture

Astro renders the page and timeline nodes at build time from typed data. The browser then enhances the static HTML with six small TypeScript modules: theme switching, custom cursor, discipline filtering, modal details, timeline positioning/zoom, and application initialization. There is no API, database, server runtime, or client-side UI framework.

The configured production URL is `https://claumigue.github.io/fragmentacion/`; `astro.config.mjs` sets the matching `site` and `base` values.

## 2. Getting Started

### Prerequisites

- Node.js `22.12.0` or newer
- npm
- Git (for deployment/contribution)
- A modern browser with ES modules, CSS custom properties, `backdrop-filter`, and `:has()` support for the full visual experience

The repository is intended to run on Windows. Use PowerShell 7+ or CMD-compatible commands; do not rely on Bash/POSIX syntax.

### Installation

```powershell
npm install
```

### Local development

```powershell
npm run dev
```

Open the URL printed by Astro, normally `http://localhost:4321/`. Use the browser for the interactive timeline, filter buttons, theme toggle, zoom controls, and event modal.

### Production build and preview

```powershell
npm run build
npm run preview
```

`npm run build` creates the static site in `dist/`. `npm run preview` serves that build locally. There is currently no test script or test framework in `package.json`; validation is primarily the Astro build plus manual browser checks.

### Deployment

```powershell
npm run deploy
```

This publishes `dist/` through `gh-pages`. Verify the `site`, `base`, repository, branch, and GitHub Pages settings before deploying. Deployment should normally be performed only by an authorized maintainer.

## 3. Project Structure

```text
/
├── .continue/rules/CONTINUE.md  # This project guide
├── public/                      # Favicons, manifest, icons, .nojekyll
├── src/
│   ├── components/              # Static Astro UI sections
│   ├── data/                    # Typed historical event and connection data
│   ├── layouts/                 # Document shell, metadata, fonts, anti-FOUC
│   ├── pages/                   # Astro routes; currently only index.astro
│   ├── scripts/                 # Browser TypeScript modules
│   ├── styles/main.css          # Global styles, tokens, responsive rules
│   └── types.ts                 # Discipline, TimelineEvent, Connection types
├── astro.config.mjs             # Static output, base URL, PWA/Workbox setup
├── package.json                 # Scripts, dependencies, Node engine
├── package-lock.json            # Locked npm dependency graph
├── tsconfig.json                # Astro strict TypeScript configuration
├── README.md / README.es.md     # English and Spanish project documentation
└── AGENTS.md                    # Repository-specific agent/development rules
```

### Astro components

- `src/pages/index.astro`: Composes `BaseLayout`, `Header`, `Hero`, `Timeline`, `Connections`, `Footer`, and `Modal`.
- `src/layouts/BaseLayout.astro`: Imports global CSS, defines Spanish document metadata, Google Fonts, favicon/manifest links, the inline theme anti-FOUC script, cursor elements, and the `main.ts` entry script.
- `Header.astro`: Static navigation, four discipline filter buttons, “Todo”, and theme toggle hooks (`data-filter`, `#themeToggleBtn`).
- `Hero.astro`: Animated title, subtitle, CTA, and era labels.
- `Timeline.astro`: Imports `events`, server-renders one track per discipline and embeds event fields as `data-*` attributes for the modal.
- `Connections.astro`: Imports and renders typed interdisciplinary connection cards.
- `Modal.astro`: Accessible HTML dialog shell; content is filled by `modal.ts`.
- `Footer.astro`: Static attribution/category footer.

### Client modules

- `main.ts`: Initializes all modules and wires smooth scrolling; theme changes trigger timeline relayout.
- `theme.ts`: Toggles `html.light` and persists `theme` in `localStorage`.
- `cursor.ts`: Tracks the pointer and animates a trailing ring using `requestAnimationFrame`.
- `filter.ts`: Adds/removes `.hidden` on `.track` elements based on `data-filter`.
- `modal.ts`: Opens event details from node datasets, handles click/keyboard activation, Escape, overlay close, focus trapping, and focus restoration.
- `timeline.ts`: Positions nodes by year, creates era bands and decade axis, and manages zoom levels `60%, 80%, 100%, 130%, 160%, 200%`.

### Data model

`src/types.ts` defines:

- `Discipline`: `literatura | cine | musica | visuales | accent`
- `TimelineEvent`: id, year, discipline, emoji, title, creator, description, quote/citation, tags, and external link
- `Connection`: discipline, title, and description

`src/data/events.ts` contains the historical timeline records. `src/data/connections.ts` contains six cross-disciplinary cards. Read the exact data files before editing them, and preserve the existing types and stable event IDs.

## 4. Development Workflow

1. Pull/install dependencies with `npm install`.
2. Run `npm run dev` while implementing changes.
3. Keep Astro markup semantic and use existing hook selectors/classes when connecting it to scripts.
4. Run `npm run build` before opening a PR or deploying.
5. Test the built site with `npm run preview`, especially because GitHub Pages uses the `/fragmentacion/` base path.
6. Do not commit unless explicitly requested by the repository owner.

### Conventions and constraints

- Keep the stack framework-free: do not add React, Vue, Svelte, or similar UI dependencies.
- Use strict TypeScript and existing interfaces. Avoid `any` and validate `dataset`/JSON assumptions when extending modal data.
- Put visual tokens in `:root` and `:root.light` in `src/styles/main.css`; use variables such as `--bg`, `--accent`, `--lit`, `--cin`, `--mus`, and `--vis` rather than hardcoding new colors.
- Preserve the dark/light theme behavior and anti-FOUC initialization.
- Keep asset URLs base-aware with `import.meta.env.BASE_URL` when adding public assets to Astro markup.
- Follow the existing Spanish UI/content language unless a bilingual feature is deliberately introduced.
- Keep accessibility: keyboard-operable nodes, visible focus states, meaningful labels, dialog attributes, Escape handling, and focus restoration.
- Avoid editing `src/data/events.ts` or `src/data/connections.ts` without first reading the current file contents.

### Testing approach

There are no automated tests configured. At minimum, manually verify:

- `npm run build` succeeds without TypeScript/Astro errors.
- All four filters and “Todo” update track visibility.
- Zoom buttons update the label and node/axis layout.
- Nodes open details by mouse, Enter, and Space; modal closes by button, overlay, and Escape.
- Tab focus remains usable in the modal and returns to the triggering node.
- Dark/light mode persists after reload and does not flash the wrong theme.
- Responsive layout works at mobile widths and the GitHub Pages base path resolves icons, manifest, and scripts.
- External Wikipedia links open safely in a new tab.

## 5. Key Concepts

- **Fragmentación**: The project’s central artistic concept: rupture, discontinuity, montage, non-linearity, collage, error, and fractured perception.
- **Discipline track**: One horizontal timeline lane for literature, cinema, music, or visual arts. Each track has a semantic `data-discipline` and corresponding CSS color token.
- **Timeline node**: A server-rendered `.node` representing a `TimelineEvent`; its `data-*` attributes are the client/server boundary used by `modal.ts`.
- **Era band**: A runtime-generated visual period in `timeline.ts`: Vanguardias, Neovanguardias, Boom & Nuevos cines, Posmodernismo, and Digital & Experimental.
- **Zoom layout**: Timeline coordinates are calculated from `START_YEAR = 1895`, `END_YEAR = 2024`, `PX_PER_YEAR = 80`, and the selected zoom factor.
- **Progressive enhancement**: HTML is generated by Astro first; JavaScript adds interaction without a framework.
- **Design tokens**: CSS variables centralize colors, typography, surfaces, borders, modal behavior, and theme-specific values.

## 6. Common Tasks

### Add or update a timeline event

1. Read `src/types.ts` and the complete current `src/data/events.ts`.
2. Add a fully populated `TimelineEvent` with a unique stable `id`, valid discipline, numeric year, tags, and a valid external link.
3. Keep content in Spanish and preserve the source/data formatting conventions.
4. Run the dev server and confirm the event appears in the correct track, at the expected year, and opens a complete modal.
5. Run `npm run build`.

### Add a connection card

1. Read `src/data/connections.ts` and `src/types.ts`.
2. Add a typed `Connection`; use an existing discipline key so `Connections.astro` can resolve its color.
3. Check card layout at desktop and mobile widths.

### Change a visual token or theme

1. Edit the relevant variable in both `:root` and `:root.light` where appropriate in `src/styles/main.css`.
2. Prefer existing variables over new literal colors.
3. Check contrast for text on discipline colors and modal links in both themes.

### Change timeline behavior

1. Inspect `Timeline.astro` for the required DOM hooks.
2. Update `src/scripts/timeline.ts` constants/layout logic.
3. Check horizontal scrolling, decade labels, era bands, hidden tracks, and every zoom step.
4. Re-test after a theme toggle because `main.ts` explicitly relayouts the timeline.

### Add public assets or metadata

1. Place static files under `public/`.
2. Reference them with `${import.meta.env.BASE_URL}` from Astro files when appropriate.
3. Update `public/site.webmanifest` if the asset is a PWA icon or launch resource.
4. Build and inspect generated paths under the `/fragmentacion/` base.

## 7. Troubleshooting

### Assets work at `/` but fail on GitHub Pages

The production base is `/fragmentacion/`. Use `import.meta.env.BASE_URL` in Astro-generated URLs and ensure manifest icon paths include `/fragmentacion/`. Test with `npm run preview` and the configured base path.

### Theme flashes or does not persist

The initial theme is applied inline in `BaseLayout.astro`; runtime changes are handled by `theme.ts`. Check browser `localStorage` key `theme`, confirm the `light` class is on `<html>`, and avoid moving the anti-FOUC script below the first paint.

### Timeline nodes overlap or disappear

Inspect `data-year` values and the `START_YEAR`, `END_YEAR`, `PX_PER_YEAR`, `TRACK_LEFT`, and zoom constants in `timeline.ts`. Confirm `layoutTimeline()` runs after the DOM exists and that nodes remain inside a `.track`.

### Modal content is missing or malformed

The modal depends on the node `data-*` attributes created in `Timeline.astro`. Check `data-tags` JSON escaping, required event fields, discipline keys, and `DISC_LABELS`/`DISC_VAR` mappings in `modal.ts`.

### Filters do not work

Check that buttons retain `data-filter`, tracks retain `data-discipline`, and `main.ts` calls `initFilter()`. The filter intentionally dims hidden tracks with `.track.hidden` rather than removing them from the DOM.

### PWA/service worker appears stale

The PWA integration uses Workbox with `registerType: 'autoUpdate'` and caches selected static extensions. During development, unregister the service worker in browser DevTools or clear site data. Rebuild before judging production behavior.

### Build fails after dependency changes

Use the required Node version, reinstall from the lockfile, and run the build again. Do not delete or regenerate `package-lock.json` casually; dependency versions are managed there.

### Documentation mismatch to verify

Some prose says the chronology is `1910–2024`, while the data and timeline configuration include Mallarmé in 1897 and use 1895 as the axis start. Confirm the intended public date range before changing hero/footer/README copy.

## 8. References

- Astro documentation: https://docs.astro.build/
- Astro static output: https://docs.astro.build/en/guides/deploy/
- Astro TypeScript: https://docs.astro.build/en/guides/typescript/
- Astro client-side scripts: https://docs.astro.build/en/guides/client-side-scripts/
- Vite PWA Astro integration: https://vite-pwa-org.netlify.app/frameworks/astro.html
- Workbox documentation: https://developer.chrome.com/docs/workbox/
- GitHub Pages: https://docs.github.com/en/pages
- GitHub Pages deployment helper (`gh-pages`): https://github.com/tschaub/gh-pages
- Project site: https://claumigue.github.io/fragmentacion
- Repository docs: `README.md`, `README.es.md`, and `AGENTS.md`

When a project rule conflicts with this guide, follow the current codebase instructions in `AGENTS.md` and the user’s explicit request. Keep this guide updated when scripts, deployment configuration, or project structure changes.
