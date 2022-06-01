const cacheName = 'AppCache-v1';

self.addEventListener('install', (event) => {
	event.waitUntil(install());
});

async function install() {
	const cache = await caches.open('v1');
	await cache.addAll(['/', '/img/about.webp']);
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

	// Add the network response to the cache for future visits.
	// We need to make a copy of the response to save it in
	// the cache and use the original as the request response.
	cache.put(request, fetchedResponse.clone());

	// Return the network response
	return fetchedResponse;
}
