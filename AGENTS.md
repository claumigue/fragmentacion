# AGENT.md — Fragmentación

## Stack tecnológico

| Capa       | Tecnología                                                   |
| :--------- | :----------------------------------------------------------- |
| Framework  | **Astro v7** (static site generator, output estático)        |
| Lenguaje   | **TypeScript** (scripts cliente) + **CSS** vainilla          |
| Bundler    | **Vite** (bajo el capó de Astro)                             |
| PWA        | Service worker nativo, sin dependencias PWA externas         |
| Despliegue | `gh-pages` → GitHub Pages                                    |
| Tipografía | Fuentes autoalojadas: Syne, DM Mono, Cormorant Garamond      |
| Entorno    | Node.js >= 22.12.0, npm                                      |
| UI         | Sin frameworks (React/Vue/Svelte) — solo Astro + TS vainilla |

## Estructura del proyecto

```tree
/
├── public/                  # Assets estáticos, PWA y fuentes
│   ├── fonts/               # Fuentes autoalojadas + licencias OFL
│   ├── registerSW.js        # Registro nativo del service worker
│   ├── site.webmanifest     # Manifest de web app
│   └── sw.js                # Lógica nativa offline/caché
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
├── astro.config.mjs         # Salida estática de Astro + base de GitHub Pages
├── package.json
└── tsconfig.json
```

## Reglas estrictas

1. **Entorno Windows.** Este proyecto se ejecuta en Windows. Todos los comandos deben ser compatibles con **PowerShell 7+** o **CMD**. No usar scripts de Bash ni sintaxis POSIX.
2. **No modificar datos** (`src/data/events.ts`, `src/data/connections.ts`) sin leer su contenido exacto primero.
3. **Estilos con variables CSS.** Los colores y tokens visuales se definen en `src/styles/main.css` bajo `:root` y `:root.light`. Usar siempre las variables (`--bg`, `--accent`, etc.) en lugar de valores hardcodeados.
4. **Sin frameworks UI.** No agregar dependencias de React, Vue, Svelte, etc. Mantener el stack actual.
5. **Commits solo cuando se solicite explícitamente.** No hacer commit sin autorización del usuario.
6. **PWA nativa.** Al modificar la PWA, conservar el registro solo en producción, las rutas compatibles con la base `/fragmentacion/` y la implementación sin dependencias PWA externas, salvo que la tarea requiera explícitamente un cambio arquitectónico.
7. **Licencias de fuentes.** Al añadir o sustituir fuentes autoalojadas, conservar o incluir sus archivos de licencia correspondientes.
