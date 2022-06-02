// Check if browser supports service workers
if ('serviceWorker' in navigator) {
	// Register a cache first, fall back to network service worker
	navigator.serviceWorker.register('./js/serviceWorker.js');
}
