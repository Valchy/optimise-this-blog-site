const cacheName = 'v1';

// Install service worker
self.addEventListener('install', (event) => {
	event.waitUntil(install());
});

async function install() {
	const cache = await caches.open(cacheName);
	const res = await fetch('/api/files');
	const { success, files } = await res.json();

	// Error handling if no files are found
	console.log(success, files);
	if (!success) return;
	await cache.addAll([...files]);
}

self.addEventListener('fetch', (event) => {
	console.log(event.request);

	if (event.request.destination === 'image') {
		event.respondWith(respondFromCacheOrNetwork(event.request));
	}
});

async function respondFromCacheOrNetwork(request) {
	const cache = await caches.open(cacheName);

	// Respond from the cache
	const cachedResponse = await cache.match(request);
	if (cachedResponse) {
		return cachedResponse;
	}

	const fetchedResponse = await fetch(request.url);
	cache.put(request, fetchedResponse.clone());

	// Return the network response
	return fetchedResponse;
}
