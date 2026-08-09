# Plan: soporte de `prefers-reduced-motion`

## Objetivo

Añadir soporte para la preferencia del sistema `prefers-reduced-motion: reduce`.
Cuando esté activa, el sitio debe reducir o eliminar el movimiento decorativo sin
perder contenido, navegación ni funcionalidad.

El alcance incluye:

- Desactivar el cursor personalizado y su bucle de animación.
- Mostrar el contenido del hero inmediatamente, sin animaciones de entrada.
- Detener el movimiento infinito de la cuadrícula.
- Eliminar transiciones y transformaciones decorativas.
- Sustituir los desplazamientos suaves por desplazamientos inmediatos.
- Omitir la sugerencia automática de desplazamiento de la timeline.
- Mantener intactas la accesibilidad y las interacciones principales.

## Archivos implicados

### `src/styles/main.css`

Añadir una media query `@media (prefers-reduced-motion: reduce)` al final del
archivo para centralizar el comportamiento visual reducido.

La media query debe:

- Establecer `animation: none` y `transition: none` para los elementos animados
o transicionados.
- Establecer `scroll-behavior: auto`.
- Detener la animación `gridDrift` del hero.
- Desactivar las animaciones `fadeUp`, `fadeIn` y `ltrIn`.
- Desactivar las transformaciones decorativas del CTA, los nodos, el modal y
  otros estados `hover`.
- Desactivar las transiciones de tema, filtros, tarjetas y controles.
- Restaurar el cursor nativo en `body`, botones, enlaces y nodos.
- Ocultar `.cursor` y `.cursor-ring`.

Los elementos del hero que empiezan con `opacity: 0` deben recibir dentro de la
media query `opacity: 1` y `transform: none`. De lo contrario, cancelar sus
animaciones dejaría parte del contenido invisible.

Selectores del hero que deben revisarse:

- `.hero-eyebrow`
- `.hero-pretitle`
- `.ltr`
- `.hero-sub`
- `.hero-cta`
- `.hero-era-labels`

### `src/scripts/cursor.ts`

Consultar `window.matchMedia('(prefers-reduced-motion: reduce)')` antes de
inicializar el cursor.

Comportamiento esperado cuando la preferencia está activa:

1. No registrar el listener de `mousemove`.
2. No iniciar el bucle `requestAnimationFrame` del anillo.
3. No actualizar las posiciones del punto ni del anillo.
4. Mantener ocultos los elementos mediante CSS.

Se recomienda escuchar el evento `change` del `MediaQueryList` para responder a
cambios de preferencia mientras la página permanece abierta. La implementación
debe evitar listeners duplicados y múltiples bucles `requestAnimationFrame`.

### `src/scripts/main.ts`

Condicionar el desplazamiento del CTA del hero:

- Usar `behavior: 'smooth'` con movimiento normal.
- Usar `behavior: 'auto'` con movimiento reducido.

También se debe evitar llamar a `scrollHint()` cuando la preferencia esté activa.

Puede añadirse una función pequeña y reutilizable para consultar la preferencia,
por ejemplo `prefersReducedMotion()`, siempre que no duplique innecesariamente la
lógica del módulo del cursor.

### `src/scripts/timeline.ts`

Proteger la propia función `scrollHint()` aunque actualmente se invoque desde
`main.ts`:

- Comprobar `prefers-reduced-motion` al comienzo de la función.
- Salir inmediatamente si está activa.
- No programar ninguno de sus `setTimeout`.
- No ejecutar llamadas a `scrollTo` con comportamiento suave.

Esto evita que el efecto se reactive accidentalmente desde otro módulo en el
futuro.

## Funcionalidad que debe conservarse

La reducción de movimiento no debe romper:

- El cambio de tema claro y oscuro.
- Los filtros por disciplina.
- El zoom de la línea temporal.
- La apertura y el cierre del modal.
- La navegación por teclado.
- Los estados `:focus-visible`.
- La visibilidad y activación de los nodos.
- El desplazamiento manual de la timeline.
- La compatibilidad responsive.

El objetivo es eliminar el movimiento decorativo, no desactivar la interfaz.

## Validación

### Movimiento normal

- El cursor personalizado aparece y sigue al puntero.
- El anillo funciona mediante `requestAnimationFrame`.
- El hero reproduce sus animaciones de entrada.
- La cuadrícula se desplaza continuamente.
- El CTA realiza un desplazamiento suave.
- La sugerencia inicial mueve la timeline y vuelve a su posición.
- El modal conserva su animación de entrada.
- Los nodos y botones conservan sus efectos `hover`.

### `prefers-reduced-motion: reduce`

- El cursor nativo permanece visible.
- `.cursor` y `.cursor-ring` no son visibles.
- No se ejecuta el bucle del cursor.
- El hero aparece completamente visible desde el inicio.
- La cuadrícula permanece estática.
- No hay escalado ni desplazamiento decorativo en `hover`.
- El modal aparece sin animación.
- El CTA se desplaza de forma inmediata.
- No se ejecuta la sugerencia automática de scroll.
- Los filtros y el cambio de tema funcionan sin transiciones.
- El teclado y los estados de foco siguen siendo utilizables y visibles.

### Cambio dinámico de preferencia

Si se implementa el listener del `MediaQueryList`, comprobar que al cambiar la
preferencia con la página abierta:

- El cursor personalizado se oculta o se reactiva correctamente.
- No se acumulan listeners `mousemove`.
- No quedan múltiples bucles `requestAnimationFrame` activos.

## Orden de implementación

1. Añadir la media query de movimiento reducido en `src/styles/main.css`.
2. Garantizar la visibilidad inicial del contenido animado del hero.
3. Adaptar `src/scripts/cursor.ts` para no iniciar su bucle cuando corresponda.
4. Condicionar el scroll suave del CTA en `src/scripts/main.ts`.
5. Proteger `scrollHint()` en `src/scripts/timeline.ts`.
6. Ejecutar `npm run build`.
7. Probar manualmente la preferencia desde las herramientas de desarrollo del
   navegador.
8. Verificar teclado, modal, tema, filtros y diseño responsive en ambos modos.

## Criterios de aceptación

- El sitio respeta `prefers-reduced-motion: reduce` sin ocultar contenido.
- El cursor personalizado no consume recursos cuando está desactivado.
- No se producen desplazamientos automáticos ni suaves en el modo reducido.
- Las interacciones existentes siguen funcionando.
- `npm run build` termina correctamente.
- El documento conserva el lenguaje visual y las variables CSS existentes.
- No se añaden dependencias ni frameworks de UI.
