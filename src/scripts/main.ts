/**
 * Entry point — imports and initialises every module.
 * Astro will bundle this into a single optimised script.
 */

import { initTheme } from './theme';
import { initCursor } from './cursor';
import { initFilter } from './filter';
import { initModal } from './modal';
import { layoutTimeline, initZoom, scrollHint } from './timeline';

// ── Smooth scroll for hero CTA ──
document.querySelector('.hero-cta')?.addEventListener('click', (e: Event) => {
	e.preventDefault();
	document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
});

// ── Init modules ──
initTheme(() => layoutTimeline()); // relayout on theme change
initCursor();
initFilter();
initModal();
initZoom();

// ── First layout + scroll hint ──
layoutTimeline();
scrollHint();
