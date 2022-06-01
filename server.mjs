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
	res.set('Cache-Control', 'public, max-age=31536000, stale-if-error=31536000');
	next();
};

// Middleware
app.use(compression());
app.use('/css', assetHeaders, express.static(path.join(__dirname, baseDir, '/css')));
app.use('/js', assetHeaders, express.static(path.join(__dirname, baseDir, '/js')));
app.use('/img', assetHeaders, express.static(path.join(__dirname, baseDir, '/img')));

// Serve index file
app.get('/', (req, res) => {
	res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=300');
	res.sendFile(path.join(__dirname, baseDir, '/index.html'));
});

// Start server on port 4000
app.listen(4000, console.log('Server running on http://localhost:4000/'));
