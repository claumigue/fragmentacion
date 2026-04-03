/**
 * Modal — opens with data from a clicked .node element, closes on overlay / × / Esc.
 */

const DISC_LABELS: Record<string, string> = {
	literatura: 'Literatura',
	cine: 'Cine',
	musica: 'Música',
	visuales: 'Artes Visuales',
};

const DISC_VAR: Record<string, string> = {
	literatura: '--lit',
	cine: '--cin',
	musica: '--mus',
	visuales: '--vis',
};

function getVar(name: string): string {
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function openModal(node: HTMLElement): void {
	const discipline = node.dataset.discipline!;
	const year = node.dataset.year!;
	const title = node.dataset.title!;
	const creator = node.dataset.creator!;
	const desc = node.dataset.desc!;
	const quote = node.dataset.quote!;
	const cite = node.dataset.cite!;
	const tags: string[] = JSON.parse(node.dataset.tags || '[]');
	const link = node.dataset.link!;

	const color = getVar(DISC_VAR[discipline]);

	document.getElementById('modalBar')!.style.background = color;

	const tagEl = document.getElementById('modalTag')!;
	tagEl.textContent = year;
	tagEl.style.borderColor = color;
	tagEl.style.color = color;
	tagEl.style.background = 'transparent';

	document.getElementById('modalDiscipline')!.textContent = DISC_LABELS[discipline];
	document.getElementById('modalTitle')!.textContent = title;
	document.getElementById('modalCreator')!.textContent = creator;
	document.getElementById('modalDesc')!.textContent = desc;
	document.getElementById('modalQuote')!.textContent = quote;
	document.getElementById('modalCite')!.textContent = cite;
	document.getElementById('modalQuoteBlock')!.style.borderColor = color;

	const tagsEl = document.getElementById('modalTags')!;
	tagsEl.innerHTML = tags.map(t => `<span class="connection-tag">${t}</span>`).join('');

	const linkEl = document.getElementById('modalLink') as HTMLAnchorElement;
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

	document.getElementById('modalOverlay')!.classList.add('active');
	document.body.style.overflow = 'hidden';
}

function closeModal(overlay: HTMLElement): void {
	overlay.classList.remove('active');
	document.body.style.overflow = '';
}

export function initModal(): void {
	const overlay = document.getElementById('modalOverlay');
	const closeBtn = document.querySelector('.modal-close');
	if (!overlay) return;

	// Close handlers
	overlay.addEventListener('click', e => {
		if (e.target === overlay) closeModal(overlay);
	});
	closeBtn?.addEventListener('click', () => closeModal(overlay));
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape') closeModal(overlay);
	});

	// Bind node clicks
	document.querySelectorAll<HTMLElement>('.node').forEach(node => {
		node.addEventListener('click', () => openModal(node));
	});
}
