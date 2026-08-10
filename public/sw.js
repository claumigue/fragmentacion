const CACHE_VERSION = 'v1';
const CACHE_PREFIX = 'fragmentacion-';
const SHELL_CACHE = `${CACHE_PREFIX}shell-${CACHE_VERSION}`;
const ASSET_CACHE = `${CACHE_PREFIX}assets-${CACHE_VERSION}`;

const scopeUrl = new URL(self.registration.scope);
const shellUrl = scopeUrl.href;
const assetPath = new URL('_astro/', scopeUrl).pathname;
const fontPath = new URL('fonts/', scopeUrl).pathname;
const fontUrls = [
	new URL('fonts/syne-latin.woff2', scopeUrl).href,
	new URL('fonts/dm-mono-latin.woff2', scopeUrl).href,
	new URL('fonts/cormorant-garamond-italic-latin.woff2', scopeUrl).href,
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const response = await fetch(new Request(shellUrl, { cache: 'reload' }));
			if (!response.ok) throw new Error(`Unable to cache app shell: ${response.status}`);

			await cacheShellAndAssets(response);
			await self.skipWaiting();
		})(),
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const activeCaches = new Set([SHELL_CACHE, ASSET_CACHE]);
			const cacheNames = await caches.keys();

			await Promise.all(
				cacheNames
					.filter((name) => name.startsWith(CACHE_PREFIX) && !activeCaches.has(name))
					.map((name) => caches.delete(name)),
			);

			await self.clients.claim();
		})(),
	);
});

self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	if (request.mode === 'navigate') {
		event.respondWith(networkFirstNavigation(event));
		return;
	}

	if (
		request.method === 'GET' &&
		url.origin === self.location.origin &&
		(url.pathname.startsWith(assetPath) || url.pathname.startsWith(fontPath))
	) {
		event.respondWith(cacheFirstAsset(request));
	}
});

async function networkFirstNavigation(event) {
	try {
		const response = await fetch(new Request(event.request, { cache: 'no-store' }));

		if (response.ok) {
			event.waitUntil(cacheShellAndAssets(response.clone()));
		}

		return response;
	} catch {
		return (
			(await caches.match(event.request)) ||
			(await caches.match(shellUrl)) ||
			new Response('The site is unavailable offline.', {
				status: 503,
				headers: { 'Content-Type': 'text/plain; charset=utf-8' },
			})
		);
	}
}

async function cacheFirstAsset(request) {
	const cache = await caches.open(ASSET_CACHE);
	const cached = await cache.match(request);
	if (cached) return cached;

	const response = await fetch(request);
	if (response.ok) await cache.put(request, response.clone());
	return response;
}

async function cacheShellAndAssets(response) {
	const html = await response.text();
	const shellCache = await caches.open(SHELL_CACHE);
	const headers = new Headers({
		'Content-Type': response.headers.get('Content-Type') || 'text/html; charset=utf-8',
	});

	await shellCache.put(shellUrl, new Response(html, { headers }));

	const assetUrls = extractAstroAssets(html);
	await Promise.all([...assetUrls, ...fontUrls].map(cacheAsset));
}

function extractAstroAssets(html) {
	const assetUrls = new Set();
	const urlPattern = /(?:src|href)=["']([^"']+)["']/g;

	for (const match of html.matchAll(urlPattern)) {
		const url = new URL(match[1], shellUrl);
		if (url.origin === self.location.origin && url.pathname.startsWith(assetPath)) {
			assetUrls.add(url.href);
		}
	}

	return [...assetUrls];
}

async function cacheAsset(url) {
	const cache = await caches.open(ASSET_CACHE);
	const cached = await cache.match(url);
	if (cached) return;

	try {
		const response = await fetch(new Request(url, { cache: 'reload' }));
		if (response.ok) await cache.put(url, response);
	} catch {
		// The shell remains available; the asset can be retried on the next request.
	}
}
