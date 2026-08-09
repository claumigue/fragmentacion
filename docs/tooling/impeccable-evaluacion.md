# Evaluación de Impeccable para el proyecto

## Resumen ejecutivo

[Impeccable](https://github.com/pbakaus/impeccable) es un conjunto de instrucciones, skills y comandos para ayudar a un agente de IA a razonar mejor sobre diseño de interfaces. No es una dependencia de ejecución para Astro ni una biblioteca que deba cargarse en el navegador.

Su incorporación al proyecto sería, por tanto, una integración del entorno de desarrollo y del agente, no de la aplicación publicada. En principio es compatible con la arquitectura actual porque puede utilizarse como una capa de criterio sobre Astro, HTML semántico y CSS vainilla, sin introducir React, Vue, Svelte ni otro framework de UI.

La recomendación es probarlo primero como herramienta de auditoría y asesoramiento, no como un mecanismo de rediseño automático. La identidad visual de **Poética de la Fragmentación** es deliberadamente editorial, experimental y fragmentaria; cualquier propuesta de Impeccable debe quedar subordinada a esa identidad y a las restricciones técnicas del repositorio.

## Contexto técnico del proyecto

El proyecto utiliza:

- Astro v6 con salida estática.
- TypeScript para los módulos de interacción del navegador.
- CSS vainilla en `src/styles/main.css`.
- Cuatro disciplinas representadas en una línea de tiempo interactiva.
- Tema oscuro y claro mediante variables CSS.
- Modal accesible, filtros, zoom, cursor personalizado y comportamiento responsive.
- Despliegue estático en GitHub Pages bajo la ruta base `/fragmentacion/`.
- Sin React, Vue, Svelte ni dependencias de UI.

Estas características hacen que Impeccable pueda aportar valor principalmente en la revisión de jerarquía visual, espaciado, tipografía, contraste, estados interactivos y responsive. No debería encargarse de decidir la estructura de datos ni la lógica de la línea de tiempo.

## Qué aportaría Impeccable

El uso más apropiado sería pedir al agente que:

1. Audite la jerarquía visual de `Hero.astro`, `Timeline.astro`, `Connections.astro` y `Modal.astro`.
2. Revise la consistencia de los tokens de `src/styles/main.css` en los temas oscuro y claro.
3. Detecte problemas de contraste, foco visible, legibilidad y densidad de información.
4. Revise la experiencia en anchuras móviles y la interacción con el timeline horizontal.
5. Proponga mejoras de estados `hover`, `focus`, `active` y `disabled`.
6. Compruebe que las animaciones no perjudiquen a usuarios con `prefers-reduced-motion`.
7. Critique la interfaz antes de modificarla, explicando el problema, la causa y el cambio propuesto.
8. Ayude a mantener una escala coherente de tipografía, espacios y superficies sin convertir el proyecto en una plantilla genérica.

## Compatibilidad con el stack

### Astro, TypeScript y CSS vainilla

La compatibilidad conceptual es buena. Impeccable puede generar recomendaciones y cambios directamente sobre componentes Astro y CSS. No necesita ejecutarse en producción ni formar parte del bundle de Vite.

Debe indicarse expresamente al agente que las soluciones se implementen con:

- markup Astro semántico;
- CSS existente y variables personalizadas;
- TypeScript vainilla para el comportamiento cliente;
- los selectores y atributos `data-*` ya utilizados por los scripts.

No debe asumir que el proyecto utiliza Tailwind, un sistema de componentes externo o una biblioteca de iconos.

### Continue

Continue puede aprovechar el contenido de Impeccable como reglas de proyecto. La adaptación más segura sería trasladar sus principios y el contexto específico del proyecto a una regla local en `.continue/rules/`.

La disponibilidad de skills o comandos con sintaxis propia dependerá de la versión y de la configuración concreta de Continue. Por eso no se debe asumir que todos los comandos de Impeccable funcionarán de forma nativa. Si fuese necesario, cada comando podría convertirse en una instrucción reutilizable para el chat de Continue.

**Valoración:** viable, pero probablemente requiere adaptación manual para obtener la experiencia completa de comandos.

### OpenCode

OpenCode parece una opción más natural si la distribución de Impeccable utiliza el formato de Agent Skills y comandos basados en archivos Markdown. En ese caso, la integración podría conservar las skills como recursos locales del agente y combinarlas con `AGENTS.md`.

La estructura exacta y el comando de instalación deben confirmarse en la documentación actual de Impeccable y de OpenCode antes de ejecutarlos. No conviene fijar aquí una orden de instalación como definitiva porque los nombres de directorios, flags y destinos pueden cambiar entre versiones.

**Valoración:** probablemente la vía más directa, siempre que la versión de OpenCode utilizada admita el formato de skills requerido.

## Integración propuesta

La integración debería dividirse en dos capas:

### 1. Skills y comandos de Impeccable

Instalarlos en el ámbito apropiado del agente elegido, preferentemente dentro del repositorio si se desea que sean reproducibles para otros colaboradores. El método exacto debe seguir el README y la versión actual del repositorio oficial.

### 2. Contexto específico de Fragmentación

Añadir al contexto del agente reglas como las siguientes:

- Mantener Astro v6, TypeScript y CSS vainilla.
- No introducir frameworks de UI ni dependencias innecesarias.
- Usar las variables de `src/styles/main.css` en lugar de nuevos colores literales.
- Preservar `:root`, `:root.light` y el cambio de tema.
- Respetar la estética editorial, cultural, experimental y no corporativa.
- No alterar los datos históricos ni sus identificadores estables.
- No romper los hooks de `timeline.ts`, `modal.ts`, `filter.ts` y `theme.ts`.
- Mantener navegación por teclado, foco visible, Escape, cierre del modal y restauración del foco.
- Considerar la ruta base `/fragmentacion/` al añadir recursos.
- Preferir propuestas pequeñas, explicadas y reversibles.
- Ejecutar `npm run build` después de cambios relevantes.

Este contexto puede vivir en las reglas del agente. No es necesario modificar `AGENTS.md` para hacer una primera prueba, aunque podría documentarse allí si se adopta Impeccable como parte estable del flujo de trabajo.

## Riesgos

### Homogeneización estética

Una herramienta de diseño puede tender hacia patrones visuales convencionales. Aquí existe el riesgo de perder la tensión, el vacío, la discontinuidad y la composición editorial que forman parte del concepto del proyecto.

### Cambios técnicos innecesarios

El agente podría proponer Tailwind, componentes de terceros, iconos externos o una reescritura del markup. Esas propuestas deben rechazarse salvo que exista una decisión técnica independiente para introducirlas.

### Ruptura de interacciones

Cambios en clases, atributos, estructura o posiciones pueden romper el timeline, los filtros, el modal o el zoom aunque el resultado visual parezca mejor. Cualquier modificación debe revisar los módulos TypeScript relacionados.

### Accesibilidad subordinada a la estética

Los efectos de desenfoque, contraste bajo, movimiento, cursores personalizados o animaciones deben evaluarse junto con teclado, lectores de pantalla, contraste y `prefers-reduced-motion`.

### Dependencia de la implementación del agente

Continue y OpenCode pueden soportar de forma diferente las skills y los comandos. La documentación del repositorio de Impeccable debe considerarse la fuente de verdad para la instalación concreta.

## Flujo de adopción recomendado

1. Elegir el agente principal: OpenCode para una integración de skills más directa o Continue para una integración basada en reglas.
2. Revisar la documentación de instalación de Impeccable y comprobar la compatibilidad con la versión del agente.
3. Instalarlo sin cambiar todavía el código de la aplicación.
4. Ejecutar una auditoría de solo lectura sobre los componentes y `main.css`.
5. Comparar las recomendaciones con la identidad visual y las restricciones de este documento.
6. Aplicar un único cambio pequeño y reversible.
7. Revisar escritorio, móvil, tema oscuro, tema claro y teclado.
8. Ejecutar `npm run build`.
9. Evaluar si el resultado mejora realmente la experiencia antes de adoptar más comandos o skills.

## Criterios de aceptación

La integración se considerará satisfactoria si:

- no añade dependencias de UI al proyecto;
- no modifica el comportamiento de producción por sí misma;
- las recomendaciones respetan Astro y CSS vainilla;
- se conservan los tokens y ambos temas;
- no se rompen timeline, modal, filtros, zoom ni ruta base;
- las propuestas son comprensibles y revisables antes de aplicarse;
- mejora al menos un problema real de jerarquía, legibilidad, responsive o accesibilidad;
- `npm run build` continúa funcionando;
- la identidad de Poética de la Fragmentación se conserva.

## Decisión provisional

**Sí merece la pena probar Impeccable**, pero como asistente de crítica y diseño dentro del entorno de desarrollo. No debe incorporarse como dependencia de la web ni utilizarse para imponer una nueva identidad visual.

Entre Continue y OpenCode, la preferencia provisional es **OpenCode** si su soporte de Agent Skills coincide con el formato utilizado por Impeccable. Continue sigue siendo una alternativa válida mediante reglas adaptadas, especialmente si ya es el entorno habitual del proyecto.

La siguiente acción recomendable no es modificar `src/`, sino confirmar la versión del agente elegido y probar una auditoría de diseño de solo lectura.

## Referencias

- Impeccable: <https://github.com/pbakaus/impeccable>
- Continue: <https://docs.continue.dev/>
- OpenCode: <https://opencode.ai/>
