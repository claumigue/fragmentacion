/**
 * Theme toggle — dark / light.
 * The initial class is set inline in <head> (see index.astro) to avoid FOUC.
 * This module only handles the runtime toggle.
 */

export function initTheme(onToggle?: () => void): void {
	const btn = document.getElementById('themeToggleBtn');
	btn?.addEventListener('click', () => {
		const isLight = document.documentElement.classList.toggle('light');
		localStorage.setItem('theme', isLight ? 'light' : 'dark');
		onToggle?.();
	});
}
