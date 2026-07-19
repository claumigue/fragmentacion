# AGENT.md — Fragmentación

## Stack tecnológico

| Capa          | Tecnología                                           |
| ------------- | ---------------------------------------------------- |
| Framework     | **Astro v6** (static site generator, output estático) |
| Lenguaje      | **TypeScript** (scripts cliente) + **CSS** vainilla  |
| Bundler       | **Vite** (bajo el capó de Astro)                     |
| PWA           | `@vite-pwa/astro` + `vite-plugin-pwa` (Workbox)      |
| Despliegue    | `gh-pages` → GitHub Pages                            |
| Tipografía    | Google Fonts: Syne, DM Mono, Cormorant Garamond      |
| Entorno       | Node.js >= 22.12.0, npm                              |
| UI            | Sin frameworks (React/Vue/Svelte) — solo Astro + TS vainilla |

## Estructura del proyecto

```
/
├── public/                  # Assets estáticos (favicons, manifest)
├── src/
│   ├── components/          # 6 componentes Astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Timeline.astro
│   │   ├── Connections.astro
│   │   ├── Modal.astro
│   │   └── Footer.astro
│   ├── data/                # Datos estáticos
│   │   ├── events.ts        # Eventos de la línea de tiempo
│   │   └── connections.ts   # Conexiones interdisciplinarias
│   ├── layouts/
│   │   └── BaseLayout.astro # Layout principal (meta, fuentes, anti-FOUC)
│   ├── scripts/             # 6 módulos TypeScript
│   │   ├── main.ts          # Entry point
│   │   ├── theme.ts         # Modo oscuro/claro
│   │   ├── cursor.ts        # Cursor personalizado
│   │   ├── filter.ts        # Filtro por disciplina
│   │   ├── modal.ts         # Modal de detalle
│   │   └── timeline.ts      # Línea de tiempo interactiva + zoom
│   ├── styles/
│   │   └── main.css         # Único CSS (~1343 líneas, variables CSS)
│   └── pages/
│       └── index.astro      # SPA de una sola página
├── dist/                    # Build de producción
├── astro.config.mjs         # Configuración de Astro + PWA
├── package.json
└── tsconfig.json
```

## Reglas estrictas

1. **Entorno Windows.** Este proyecto se ejecuta en Windows. Todos los comandos deben ser compatibles con **PowerShell 7+** o **CMD**. No usar scripts de Bash ni sintaxis POSIX.
2. **No modificar datos** (`src/data/events.ts`, `src/data/connections.ts`) sin leer su contenido exacto primero.
3. **Estilos con variables CSS.** Los colores y tokens visuales se definen en `src/styles/main.css` bajo `:root` y `:root.light`. Usar siempre las variables (`--bg`, `--accent`, etc.) en lugar de valores hardcodeados.
4. **Sin frameworks UI.** No agregar dependencias de React, Vue, Svelte, etc. Mantener el stack actual.
5. **Commits solo cuando se solicite explícitamente.** No hacer commit sin autorización del usuario.
