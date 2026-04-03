/**
 * Timeline layout — positions server-rendered nodes,
 * draws era bands & time axis, manages zoom.
 */

// ─── Config ─────────────────────────────────────────────────────────────────
const START_YEAR = 1895;
const END_YEAR = 2024;
const PX_PER_YEAR = 80;
const TRACK_LEFT = 120;

interface Era {
	label: string;
	start: number;
	end: number;
}

const ERAS: Era[] = [
	{ label: 'Vanguardias', start: 1895, end: 1940 },
	{ label: 'Neovanguardias', start: 1940, end: 1968 },
	{ label: 'Boom & Nuevos cines', start: 1968, end: 1985 },
	{ label: 'Posmodernismo', start: 1985, end: 2000 },
	{ label: 'Digital & Experimental', start: 2000, end: 2024 },
];

// ─── Zoom state ─────────────────────────────────────────────────────────────
const ZOOM_STEPS = [0.6, 0.8, 1, 1.3, 1.6, 2] as const;
let zoomIndex = 2;
let zoomLevel = ZOOM_STEPS[zoomIndex];

function yearToX(year: number): number {
	return TRACK_LEFT + (year - START_YEAR) * PX_PER_YEAR * zoomLevel;
}

// ─── Layout ─────────────────────────────────────────────────────────────────

/**
 * Positions all server-rendered `.node` elements and redraws
 * the zoom-dependent era bands + time axis.
 */
export function layoutTimeline(): void {
	const inner = document.getElementById('timelineInner');
	const tracksEl = document.getElementById('tracks');
	if (!inner || !tracksEl) return;

	const totalWidth = TRACK_LEFT + (END_YEAR - START_YEAR) * PX_PER_YEAR * zoomLevel + 80;
	inner.style.width = totalWidth + 'px';

	// Remove previous dynamic elements
	inner.querySelectorAll('.era-bg-container, .time-axis-container').forEach(el => el.remove());

	// ── Era background bands ──
	const eraBg = document.createElement('div');
	eraBg.className = 'era-bg-container';
	eraBg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
	ERAS.forEach((era, i) => {
		const x = yearToX(era.start);
		const w = yearToX(era.end) - x;
		const band = document.createElement('div');
		band.style.cssText = `
			position:absolute;
			left:${x}px;width:${w}px;
			top:0;height:100%;
			background:${i % 2 === 0 ? 'rgba(128,128,128,0.04)' : 'transparent'};
			border-right:1px solid var(--era-band-border, #252525);
		`;
		const lbl = document.createElement('div');
		lbl.textContent = era.label;
		lbl.style.cssText = `
			font-family:var(--font-mono);font-size:9px;
			letter-spacing:0.12em;text-transform:uppercase;
			color:var(--era-label-color, #444);
			position:absolute;top:8px;left:12px;white-space:nowrap;
		`;
		band.appendChild(lbl);
		eraBg.appendChild(band);
	});
	inner.insertBefore(eraBg, tracksEl);

	// ── Time axis ──
	const axis = document.createElement('div');
	axis.className = 'time-axis-container';
	axis.style.cssText = `
		position:relative;height:50px;margin-bottom:32px;
		margin-left:0;border-bottom:1px solid var(--axis-border, #333);
	`;
	for (let y = Math.ceil(START_YEAR / 10) * 10; y <= END_YEAR; y += 10) {
		const tick = document.createElement('div');
		tick.style.cssText = `
			position:absolute;left:${yearToX(y)}px;bottom:0;
			transform:translateX(-50%);text-align:center;
		`;
		tick.innerHTML = `
			<div style="width:1px;height:8px;background:var(--tick-line, #444);margin:0 auto;"></div>
			<div style="font-family:var(--font-mono);font-size:9px;color:var(--tick-label, #666);margin-top:4px;white-space:nowrap;">${y}</div>
		`;
		axis.appendChild(tick);
	}
	inner.insertBefore(axis, tracksEl);

	// ── Tracks container ──
	tracksEl.style.cssText = 'display:flex;flex-direction:column;gap:32px;position:relative;z-index:1;';

	// ── Reposition nodes ──
	inner.querySelectorAll<HTMLElement>('.node').forEach(node => {
		const year = Number(node.dataset.year);
		node.style.left = yearToX(year) + 'px';
	});
}

// ─── Zoom ───────────────────────────────────────────────────────────────────

export function initZoom(): void {
	document.querySelectorAll<HTMLButtonElement>('.zoom-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			const dir = Number(btn.dataset.zoom);
			zoomIndex = Math.max(0, Math.min(ZOOM_STEPS.length - 1, zoomIndex + dir));
			zoomLevel = ZOOM_STEPS[zoomIndex];
			const label = document.getElementById('zoomLabel');
			if (label) label.textContent = Math.round(zoomLevel * 100) + '%';
			layoutTimeline();
		});
	});
}

// ─── Scroll hint ────────────────────────────────────────────────────────────

export function scrollHint(): void {
	setTimeout(() => {
		const tw = document.getElementById('timelineWrapper');
		if (!tw) return;
		tw.scrollTo({ left: 200, behavior: 'smooth' });
		setTimeout(() => tw.scrollTo({ left: 0, behavior: 'smooth' }), 800);
	}, 2000);
}
