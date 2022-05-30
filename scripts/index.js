const path = require('path');
const fs = require('fs');

require('colors');
const cheerio = require('cheerio');

// Custom bundle modules
const bundleCSS = require('./bundleCSS.js');
const bundleJS = require('./bundleJS.js');
const bundleIMGS = require('./bundleIMGS.js');
const bundleHTML = require('./bundleHTML.js');

try {
	(async () => {
		console.log('Build script started...\n'.blue);
		const distPath = (extra = '') => path.join(__dirname, `../dist${extra}`);

		// Error handling => cleaning up "dist" dir and creating a new one
		if (fs.existsSync(distPath())) fs.rmSync(distPath(), { recursive: true });
		if (!fs.existsSync(distPath())) fs.mkdirSync(distPath());
		if (!fs.existsSync(distPath('/css'))) fs.mkdirSync(distPath('/css'));
		if (!fs.existsSync(distPath('/js'))) fs.mkdirSync(distPath('/js'));
		if (!fs.existsSync(distPath('/img'))) fs.mkdirSync(distPath('/img'));

		// Load HTML and prepare for production build
		const html = fs.readFileSync(path.join(__dirname, '../src/index.html'), 'utf8');
		const $ = cheerio.load(html);

		// Handling bundle logic for the different file types
		await bundleCSS($);
		await bundleJS($);
		await bundleIMGS($);
		await bundleHTML($);
	})();
} catch (err) {
	console.error(`Error: ${err.message.white}`.red);
	console.log('Build failed, please check the error above.'.brightRed);
}
