const addResourcesToCache = async (resources) => {
	const cache = await caches.open('v1');
	await cache.addAll(resources);
};

self.addEventListener('install', async (event) => {
	const res = await fetch('/api/files');
	const { success, files } = await res.json();

	// Error handling if no files are found
	if (!success) return;

	event.waitUntil(addResourcesToCache([...files]));
});

self.addEventListener('fetch', (event) => {
	event.respondWith(caches.match(event.request));
});
