(() => {
	if (!('serviceWorker' in navigator)) return;

	const scriptUrl = document.currentScript?.src;
	if (!scriptUrl) return;

	const scopeUrl = new URL('./', scriptUrl);
	const workerUrl = new URL('sw.js', scopeUrl);

	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register(workerUrl.href, {
				scope: scopeUrl.href,
				updateViaCache: 'none',
			})
			.then((registration) => registration.update())
			.catch((error) => {
				console.warn('Service worker registration failed.', error);
			});
	});
})();
