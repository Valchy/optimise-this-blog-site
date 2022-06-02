import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = process.env.NODE_ENV === 'production' ? './dist' : './src';
const app = express();

// Custom cache headers for assets
const assetHeaders = (req, res, next) => {
	// Cache static assets for 1 year on the browser, 7 days on CDNs and keep old file when revalidating or upon server error
	res.set('Cache-Control', 'public, max-age=31536000, s-maxage=604800, stale-while-revalidate=86400, stale-if-error=86400');
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
	// 2 minute browser cache, 1 minute CDN cache, safe to be cached on CDNs as well, will keep old html file when revalidating or upon a server error
	res.set('Cache-Control', 'public, max-age=120, s-maxage=60, stale-while-revalidate=86400, stale-if-error=86400');
	res.sendFile(path.join(__dirname, baseDir, '/index.html'));
});

// Get all files recursively
async function getFiles(dir) {
	const dirents = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		dirents.map((dirent) => {
			const res = path.resolve(dir, dirent.name);
			return dirent.isDirectory() ? getFiles(res) : res;
		})
	);

	return Array.prototype.concat(...files);
}

// Api route to get all files from baseDir recursively
app.get('/api/files', async (req, res) => {
	try {
		const files = await getFiles(path.join(__dirname, baseDir));
		res.json({
			success: true,
			files: files.map((file) => {
				file = file.replace(path.join(__dirname, baseDir), '');
				return file.replace(/\\/g, '/');
			}),
		});
	} catch (err) {
		res.json({ success: false, error: err });
	}
});

// Start server on port 4000
app.listen(4000, console.log('Server running on http://localhost:4000/'));
