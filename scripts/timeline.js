
// ─── TIMELINE CONFIG ────────────────────────────────────────────────────────
const START_YEAR = 1895;
const END_YEAR = 2024;
const PX_PER_YEAR = 80;
const TRACK_LEFT = 120;

const ERAS = [
	{ label: 'Vanguardias', start: 1895, end: 1940 },
	{ label: 'Neovanguardias', start: 1940, end: 1968 },
	{ label: 'Boom & Nuevos cines', start: 1968, end: 1985 },
	{ label: 'Posmodernismo', start: 1985, end: 2000 },
	{ label: 'Digital & Experimental', start: 2000, end: 2024 },
];

const DISC_LABELS = { literatura: 'Literatura', cine: 'Cine', musica: 'Música', visuales: 'Artes Visuales' };

const DISC_VAR = {
	literatura: '--lit',
	cine: '--cin',
	musica: '--mus',
	visuales: '--vis',
};

const DISC_ON_VAR = {
	literatura: '--on-lit',
	cine: '--on-cin',
	musica: '--on-mus',
	visuales: '--on-vis',
};

// ─── THEME ───────────────────────────────────────────────────────────────────
function toggleTheme() {
	const isLight = document.documentElement.classList.toggle('light');
	localStorage.setItem('theme', isLight ? 'light' : 'dark');
	layoutTimeline(); // relayout to pick up new CSS variable values
}

document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);

// ─── ZOOM ───────────────────────────────────────────────────────────────────
let zoomLevel = 1;
const ZOOM_STEPS = [0.6, 0.8, 1, 1.3, 1.6, 2];
let zoomIndex = 2;

function changeZoom(dir) {
	zoomIndex = Math.max(0, Math.min(ZOOM_STEPS.length - 1, zoomIndex + dir));
	zoomLevel = ZOOM_STEPS[zoomIndex];
	document.getElementById('zoomLabel').textContent = Math.round(zoomLevel * 100) + '%';
	layoutTimeline();
}

document.querySelectorAll('.zoom-btn')
	.forEach(btn => {
		btn.addEventListener('click', () => {
			const zoom = Number(btn.dataset.zoom);
			changeZoom(zoom);
		});
	});

// ─── LAYOUT ─────────────────────────────────────────────────────────────────
function yearToX(year) {
	return TRACK_LEFT + (year - START_YEAR) * PX_PER_YEAR * zoomLevel;
}

function getVar(name) {
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * layoutTimeline() — positions the server-rendered nodes and
 * rebuilds the zoom-dependent era bands + time axis.
 * The nodes (.node elements) are NOT destroyed/recreated — only repositioned.
 */
function layoutTimeline() {
	const inner = document.getElementById('timelineInner');
	const tracksEl = document.getElementById('tracks');
	const totalWidth = TRACK_LEFT + (END_YEAR - START_YEAR) * PX_PER_YEAR * zoomLevel + 80;
	inner.style.width = totalWidth + 'px';

	// ── Remove previous dynamic elements (era bands + axis) ──
	inner.querySelectorAll('.era-bg-container, .time-axis-container').forEach(el => el.remove());

	// ── Era background bands ──
	const eraBg = document.createElement('div');
	eraBg.className = 'era-bg-container';
	eraBg.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;`;
	ERAS.forEach((era, i) => {
		const x = yearToX(era.start);
		const w = yearToX(era.end) - x;
		const band = document.createElement('div');
		band.style.cssText = `
			position:absolute;
			left:${x}px;
			width:${w}px;
			top:0; height:100%;
			background:${i % 2 === 0 ? 'rgba(128,128,128,0.04)' : 'transparent'};
			border-right:1px solid var(--era-band-border, #252525);
		`;
		const lbl = document.createElement('div');
		lbl.textContent = era.label;
		lbl.style.cssText = `
			font-family:var(--font-mono);
			font-size:9px;
			letter-spacing:0.12em;
			text-transform:uppercase;
			color:var(--era-label-color, #444);
			position:absolute;
			top:8px;left:12px;
			white-space:nowrap;
		`;
		band.appendChild(lbl);
		eraBg.appendChild(band);
	});
	// Insert era bands before the tracks
	inner.insertBefore(eraBg, tracksEl);

	// ── Time axis ──
	const axis = document.createElement('div');
	axis.className = 'time-axis-container';
	axis.style.cssText = `
		position:relative;
		height:50px;
		margin-bottom:32px;
		margin-left:0;
		border-bottom:1px solid var(--axis-border, #333);
	`;

	for (let y = Math.ceil(START_YEAR / 10) * 10; y <= END_YEAR; y += 10) {
		const tick = document.createElement('div');
		tick.style.cssText = `
			position:absolute;
			left:${yearToX(y)}px;
			bottom:0;
			transform:translateX(-50%);
			text-align:center;
		`;
		tick.innerHTML = `
			<div style="width:1px;height:8px;background:var(--tick-line, #444);margin:0 auto;"></div>
			<div style="font-family:var(--font-mono);font-size:9px;color:var(--tick-label, #666);margin-top:4px;white-space:nowrap;">${y}</div>
		`;
		axis.appendChild(tick);
	}
	// Insert axis before the tracks
	inner.insertBefore(axis, tracksEl);

	// ── Make tracks container positioned ──
	tracksEl.style.cssText = `display:flex;flex-direction:column;gap:32px;position:relative;z-index:1;`;

	// ── Reposition all server-rendered nodes ──
	inner.querySelectorAll('.node').forEach(node => {
		const year = Number(node.dataset.year);
		node.style.left = yearToX(year) + 'px';
	});
}

// ─── MODAL ───────────────────────────────────────────────────────────────────
function openModal(node) {
	// Read data from the node's data-* attributes
	const discipline = node.dataset.discipline;
	const year = node.dataset.year;
	const title = node.dataset.title;
	const creator = node.dataset.creator;
	const desc = node.dataset.desc;
	const quote = node.dataset.quote;
	const cite = node.dataset.cite;
	const tags = JSON.parse(node.dataset.tags || '[]');
	const link = node.dataset.link;

	const color = getVar(DISC_VAR[discipline]);

	document.getElementById('modalBar').style.background = color;

	// Tag: colored border + colored text
	const tagEl = document.getElementById('modalTag');
	tagEl.textContent = year;
	tagEl.style.borderColor = color;
	tagEl.style.color = color;
	tagEl.style.background = 'transparent';

	document.getElementById('modalDiscipline').textContent = DISC_LABELS[discipline];
	document.getElementById('modalTitle').textContent = title;
	document.getElementById('modalCreator').textContent = creator;
	document.getElementById('modalDesc').textContent = desc;
	document.getElementById('modalQuote').textContent = quote;
	document.getElementById('modalCite').textContent = cite;
	document.getElementById('modalQuoteBlock').style.borderColor = color;

	const tagsEl = document.getElementById('modalTags');
	tagsEl.innerHTML = tags.map(t => `<span class="connection-tag">${t}</span>`).join('');

	const linkEl = document.getElementById('modalLink');
	linkEl.href = link;
	linkEl.textContent = 'Explorar en Wikipedia →';
	linkEl.style.borderColor = color;
	linkEl.style.color = color;
	linkEl.style.background = 'transparent';
	linkEl.onmouseenter = () => {
		const isDark = !document.documentElement.classList.contains('light');
		linkEl.style.background = getVar(DISC_VAR[discipline]);
		linkEl.style.color = isDark ? '#000' : '#fff';
	};
	linkEl.onmouseleave = () => {
		linkEl.style.background = 'transparent';
		linkEl.style.color = getVar(DISC_VAR[discipline]);
	};

	document.getElementById('modalOverlay').classList.add('active');
	document.body.style.overflow = 'hidden';
}

function closeModalDirect() {
	if (!overlay) return;

	overlay.classList.remove('active');
	document.body.style.overflow = '';
}

const overlay = document.getElementById('modalOverlay');
const closeBtn = document.querySelector('.modal-close');

overlay?.addEventListener('click', e => {
	if (e.target === overlay) closeModalDirect();
});

closeBtn?.addEventListener('click', closeModalDirect);

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') closeModalDirect();
});

// ─── BIND NODE CLICKS ────────────────────────────────────────────────────────
document.querySelectorAll('.node').forEach(node => {
	node.addEventListener('click', () => openModal(node));
});

// ─── FILTER ──────────────────────────────────────────────────────────────────
const filterDiscipline = (disc, btn) => {
	document.querySelectorAll('.header-nav button').forEach(b => b.classList.remove('active'));
	btn.classList.add('active');

	document.querySelectorAll('.track').forEach(track => {
		if (disc === 'all' || track.dataset.discipline === disc) {
			track.classList.remove('hidden');
		} else {
			track.classList.add('hidden');
		}
	});
}

document.querySelectorAll('.header-nav button[data-filter]')
	.forEach(btn => {
		btn.addEventListener('click', () => {
			const filter = btn.dataset.filter;
			filterDiscipline(filter, btn);
		});
	});

// ─── CURSOR ──────────────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
	mx = e.clientX; my = e.clientY;
	cursor.style.left = mx + 'px';
	cursor.style.top = my + 'px';
});

(function animRing() {
	rx += (mx - rx) * 0.12;
	ry += (my - ry) * 0.12;
	ring.style.left = rx + 'px';
	ring.style.top = ry + 'px';
	requestAnimationFrame(animRing);
})();

// ─── SMOOTH SCROLL ────────────────────────────────────────────────────────────
document.querySelector('.hero-cta').addEventListener('click', e => {
	e.preventDefault();
	document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
});

// ─── INIT ─────────────────────────────────────────────────────────────────────
layoutTimeline();

// Scroll hint animation
setTimeout(() => {
	const tw = document.getElementById('timelineWrapper');
	tw.scrollTo({ left: 200, behavior: 'smooth' });
	setTimeout(() => tw.scrollTo({ left: 0, behavior: 'smooth' }), 800);
}, 2000);
