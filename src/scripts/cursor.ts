/**
 * Custom cursor — dot follows immediately, ring trails with easing.
 */

export function initCursor(): void {
	const dot = document.getElementById('cursor');
	const ring = document.getElementById('cursorRing');
	if (!dot || !ring) return;

	let mx = 0;
	let my = 0;
	let rx = 0;
	let ry = 0;

	document.addEventListener('mousemove', (e: MouseEvent) => {
		mx = e.clientX;
		my = e.clientY;
		dot.style.left = mx + 'px';
		dot.style.top = my + 'px';
	});

	(function animRing(): void {
		rx += (mx - rx) * 0.12;
		ry += (my - ry) * 0.12;
		ring.style.left = rx + 'px';
		ring.style.top = ry + 'px';
		requestAnimationFrame(animRing);
	})();
}
