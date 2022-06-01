import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = process.env.NODE_ENV === 'production' ? './dist' : '/.src';
const app = express();

// Custom cache headers for assets
const assetHeaders = (req, res, next) => {
	// Cache static assets for 1 year and keep old file when revalidating or upon server error
	res.set('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=86400, stale-if-error=86400');
	next();
};

// Gzip compression for all files
app.use(compression());

// Serve static files
// Automatically adds etag and last-modifed headers for conditional requests
app.use('/css', assetHeaders, express.static(path.join(__dirname, baseDir, '/css')));
app.use('/js', assetHeaders, express.static(path.join(__dirname, baseDir, '/js')));
app.use('/img', assetHeaders, express.static(path.join(__dirname, baseDir, '/img')));

// Serve index file
app.get('/', (req, res) => {
	// 2 minute browser cache, safe to be cached on CDNs as well, will keep old html file when revalidating or upon a server error
	res.set('Cache-Control', 'public, max-age=120, stale-while-revalidate=86400, stale-if-error=86400');
	res.sendFile(path.join(__dirname, baseDir, '/index.html'));
});

// Start server on port 4000
app.listen(4000, console.log('Server running on http://localhost:4000/'));
