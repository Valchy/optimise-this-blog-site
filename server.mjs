import { createServer } from 'http';
import staticHandler from './staticHandler.mjs';

const server = createServer((req, res) => {
	staticHandler(req, res);
});

server.listen(4000, () => {
	console.log('Server running at http://localhost:4000/');
});

const serverDist = createServer((req, res) => {
	staticHandler(req, res, 'dist');
});

serverDist.listen(4004, () => {
	console.log('Server running at http://localhost:4004/');
});
