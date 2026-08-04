# Plan para internacionalizar el sitio

## Objetivo

Convertir el sitio en una experiencia bilingüe español-inglés, manteniendo la
generación estática actual y dejando una base clara para añadir más idiomas sin
duplicar la lógica de la aplicación.

## Decisiones recomendadas

- Usar rutas estáticas por idioma:
  - `/fragmentacion/es/`
  - `/fragmentacion/en/`
- Mantener español como idioma predeterminado para la ruta raíz.
- Renderizar cada idioma en Astro, en lugar de traducir la interfaz solamente
  con JavaScript en el navegador.
- Separar los textos de interfaz de los datos culturales de la timeline.
- Mantener IDs, años, disciplinas y otros metadatos compartidos entre idiomas.
- Hacer que el selector de idioma sea una navegación normal mediante enlaces.

Este enfoque favorece el SEO, la accesibilidad, la carga inicial y la
compatibilidad con GitHub Pages.

## Arquitectura propuesta

### Configuración de idiomas

Crear `src/i18n/config.ts` con la lista de idiomas soportados, el idioma
predeterminado y sus metadatos.

```ts
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';
```

Los metadatos deberían incluir, como mínimo:

- Código del idioma para `lang` y `hreflang`.
- Nombre visible del idioma.
- Segmento de URL.
- Título y descripción por defecto.

Para añadir otro idioma en el futuro, se agregaría su código, su diccionario,
sus traducciones de contenido y su ruta generada.

### Diccionarios de interfaz

Crear una estructura como la siguiente:

```text
src/i18n/
├── config.ts
├── types.ts
├── es.ts
└── en.ts
```

Los diccionarios deben contener todos los textos de interfaz:

- Navegación y filtros.
- Hero, CTA y etiquetas de eras.
- Títulos y etiquetas de secciones.
- Leyenda de disciplinas.
- Controles de zoom.
- Modal de detalle.
- Footer.
- Etiquetas `aria-label` y otros textos accesibles.
- Estados y controles del tema.
- Enlace para explorar la fuente externa.

Los componentes Astro recibirán el idioma y consultarán el diccionario en vez
de incluir textos españoles directamente.

### Datos de la timeline

Refactorizar `src/data/events.ts` y `src/data/connections.ts` para separar los
metadatos compartidos de los campos traducibles.

```ts
interface EventTranslation {
  title: string;
  desc: string;
  quote: string;
  cite: string;
  tags: string[];
  link: string;
}

interface TimelineEvent {
  id: string;
  year: number;
  discipline: Discipline;
  emoji: string;
  translations: Record<Locale, EventTranslation>;
}
```

Las conexiones deben seguir el mismo patrón. Los IDs deben permanecer
estables y ser independientes del idioma para permitir enlaces y referencias
futuras.

Los nombres propios, años, emojis y disciplinas deben compartirse cuando no
requieren traducción. Los títulos, descripciones, citas, etiquetas y enlaces
externos pueden variar por idioma.

## Fases de implementación

### 1. Inventario y tipos

- Auditar todos los textos visibles y accesibles de `src/`.
- Registrar los textos dinámicos usados por los scripts del navegador.
- Definir `Locale`, los metadatos de idioma y los tipos de traducción.
- Mantener el contenido español actual como referencia editorial.

### 2. Diccionarios de interfaz

- Extraer los textos estáticos de `Header.astro`, `Hero.astro`,
  `Timeline.astro`, `Connections.astro`, `Modal.astro` y `Footer.astro`.
- Crear los diccionarios español e inglés.
- Traducir textos visibles, etiquetas, estados y atributos ARIA.
- Añadir el selector de idioma en el header.

### 3. Contenido bilingüe

- Incorporar traducciones inglesas para los eventos de la timeline.
- Incorporar traducciones inglesas para las conexiones.
- Revisar títulos, citas, etiquetas y enlaces externos.
- Añadir una validación que detecte traducciones faltantes.

### 4. Rutas estáticas

Crear una página localizada, por ejemplo:

```text
src/pages/
├── index.astro
└── [lang]/
    └── index.astro
```

Cada ruta debe:

1. Validar el idioma solicitado.
2. Obtener el diccionario correspondiente.
3. Obtener la traducción de eventos y conexiones.
4. Pasar `locale` y contenido localizado al layout y a los componentes.

La ruta raíz debe redirigir a `/es/` o mostrar un selector inicial. Se
recomienda redirigir a español para preservar el comportamiento actual y
reducir la complejidad inicial.

### 5. Scripts del navegador

Los textos de `src/scripts/modal.ts` y de otros módulos no deben permanecer
hardcodeados en español.

Exponer al cliente el contenido del idioma activo mediante atributos
`data-*` o un bloque JSON generado por Astro. El objeto debe incluir, como
mínimo:

- Etiquetas de disciplinas.
- Texto del enlace externo.
- Etiquetas de zoom.
- Estados y mensajes accesibles.

El servidor debe renderizar los valores localizados que el script usará para
rellenar el modal y otros elementos dinámicos.

### 6. SEO y metadatos

Actualizar `BaseLayout.astro` para generar por idioma:

- `<html lang="es">` o `<html lang="en">`.
- `title` y `description`.
- URL canónica.
- Enlaces `alternate` con `hreflang` para cada idioma.
- `hreflang="x-default"`.
- Metadatos Open Graph localizados.

Revisar también `public/site.webmanifest` y los metadatos de la PWA para
determinar qué valores deben ser comunes y cuáles deben localizarse.

### 7. Validación y documentación

- Ejecutar `npm run build`.
- Confirmar que `/es/` y `/en/` se generan dentro de `dist/`.
- Probar filtros, modal, zoom, tema, navegación y teclado en ambos idiomas.
- Comprobar el comportamiento responsive.
- Revisar enlaces externos y metadatos SEO.
- Documentar en el README cómo agregar un idioma nuevo.

## Reglas para añadir idiomas posteriormente

1. Agregar el código del idioma en `src/i18n/config.ts`.
2. Crear su diccionario de interfaz.
3. Añadir las traducciones de eventos y conexiones.
4. Generar o habilitar su ruta estática.
5. Añadir sus enlaces `hreflang` y metadatos.
6. Ejecutar las validaciones y el build.

El build debe fallar o emitir una alerta clara si falta una traducción
obligatoria.

## Criterios de aceptación

- El usuario puede navegar entre español e inglés desde cualquier página.
- Cada idioma tiene una URL estable y compartible.
- La versión inglesa no muestra textos de interfaz españoles por accidente.
- El contenido de la timeline y las conexiones está traducido de forma
  consistente.
- El modal, los filtros, el zoom, el tema y la navegación por teclado funcionan
  en ambos idiomas.
- Las páginas incluyen `lang`, canonical y `hreflang` correctos.
- Añadir un tercer idioma no requiere duplicar componentes ni scripts.
- `npm run build` genera correctamente todas las rutas localizadas.

## Ubicación del documento

Este plan se guarda en `docs/plans/bilingual-site.md` porque describe una
iniciativa técnica futura. El `README` debe conservar la información de uso,
arquitectura actual y comandos principales; cuando la implementación termine,
se actualizará para documentar los idiomas disponibles y el procedimiento para
añadir otros.
