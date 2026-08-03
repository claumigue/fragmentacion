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

let activeNode: HTMLElement | null = null;

function getFocusableElements(container: HTMLElement): HTMLElement[] {
	return Array.from(container.querySelectorAll<HTMLElement>(
		'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
	));
}

function openModal(node: HTMLElement): void {
	const overlay = document.getElementById('modalOverlay')!;
	const modal = document.getElementById('modal')!;
	const closeBtn = document.querySelector<HTMLButtonElement>('.modal-close')!;
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

	activeNode = node;
	overlay.classList.add('active');
	overlay.setAttribute('aria-hidden', 'false');
	document.body.style.overflow = 'hidden';
	closeBtn.focus();
}

function closeModal(overlay: HTMLElement): void {
	if (!overlay.classList.contains('active')) return;
	overlay.classList.remove('active');
	overlay.setAttribute('aria-hidden', 'true');
	document.body.style.overflow = '';
	activeNode?.focus();
	activeNode = null;
}

export function initModal(): void {
	const overlay = document.getElementById('modalOverlay');
	const modal = document.getElementById('modal');
	const closeBtn = document.querySelector('.modal-close');
	if (!overlay || !modal) return;

	// Close handlers
	overlay.addEventListener('click', e => {
		if (e.target === overlay) closeModal(overlay);
	});
	closeBtn?.addEventListener('click', () => closeModal(overlay));
	document.addEventListener('keydown', e => {
		if (!overlay.classList.contains('active')) return;

		if (e.key === 'Escape') {
			closeModal(overlay);
			return;
		}

		if (e.key !== 'Tab') return;
		const focusable = getFocusableElements(modal);
		if (focusable.length === 0) {
			e.preventDefault();
			modal.focus();
			return;
		}

		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		const focusIsOutside = !modal.contains(document.activeElement);
		if (e.shiftKey && (focusIsOutside || document.activeElement === first)) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && (focusIsOutside || document.activeElement === last)) {
			e.preventDefault();
			first.focus();
		}
	});

	// Bind node clicks
	document.querySelectorAll<HTMLElement>('.node').forEach(node => {
		node.addEventListener('click', () => openModal(node));
		node.addEventListener('keydown', e => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				openModal(node);
			}
		});
	});
}
