/**
 * Discipline filter — hides/shows tracks via `.hidden` class.
 */

export function initFilter(): void {
	document.querySelectorAll<HTMLButtonElement>('.header-nav button[data-filter]')
		.forEach(btn => {
			btn.addEventListener('click', () => {
				// Update active button
				document.querySelectorAll('.header-nav button')
					.forEach(b => b.classList.remove('active'));
				btn.classList.add('active');

				// Show/hide tracks
				const disc = btn.dataset.filter!;
				document.querySelectorAll<HTMLDivElement>('.track').forEach(track => {
					if (disc === 'all' || track.dataset.discipline === disc) {
						track.classList.remove('hidden');
					} else {
						track.classList.add('hidden');
					}
				});
			});
		});
}
