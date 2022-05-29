require('colors');
const path = require('path');
const fs = require('fs');

const cheerio = require('cheerio');
const resizeImg = require('resize-img');

const webp = require('webp-converter');
webp.grant_permission();

const minify = require('@node-minify/core');
const htmlMinifier = require('@node-minify/html-minifier');
const uglifyES = require('@node-minify/uglify-es');
const cssnano = require('@node-minify/cssnano');

console.log('Build script started...\n'.blue);

try {
	// Load HTML and prepare for production build
	const html = fs.readFileSync(path.join(__dirname, './src/index.html'), 'utf8');
	const $ = cheerio.load(html);

	$('link[rel="stylesheet"]').map(function () {
		const css = fs.readFileSync(path.join(__dirname, `./src/${$(this).attr('href')}`), 'utf8');
		console.log(`Converting: ${$(this).attr('href')}`.cyan);

		minify({
			compressor: cssnano,
			input: path.join(__dirname, `/src/${$(this).attr('href')}`),
			output: path.join(__dirname, `/dist/${$(this).attr('href')}`),
			callback: function (err, min) {
				console.log('DONE!'.green);
			},
		});
	});

	$('script[src]').map(function () {
		const js = fs.readFileSync(path.join(__dirname, `./src/${$(this).attr('src')}`), 'utf8');
		console.log(`Converting: ${$(this).attr('src')}`.red);

		minify({
			compressor: uglifyES,
			input: path.join(__dirname, `/src/${$(this).attr('src')}`),
			output: path.join(__dirname, `/dist/${$(this).attr('src')}`),
			callback: function (err, min) {
				console.log('DONE JS!'.green);
			},
		});
	});

	// Resizing all images and transforming them into webp format
	$('img').map(function () {
		console.log(`Converting: ${$(this).attr('src')}`.green);

		(async () => {
			const resizedImage = await resizeImg(fs.readFileSync(path.join(__dirname, `./src/${$(this).attr('src')}`)), {
				width: 128,
				height: 128,
			});

			// let webpImage = webp.cwebp(resizedImage, 'webp', '-q 80');
			// webpImage.then(function (webpImage) {
			// 	fs.writeFileSync(path.join(__dirname, `./dist/${$(this).attr('src')}`), webpImage);
			// });
		})();

		$(this).attr('src', 'random.jpg');
	});

	fs.readdir(path.join('./src'), (err, files) => {
		if (err) throw new Error('src dir not found');

		//
		files.forEach((file) => {
			// console.log(file);
		});
	});

	fs.writeFile(path.join(__dirname, './dist/index.html'), $.html(), function (err) {
		if (err) throw err;

		minify({
			compressor: htmlMinifier,
			input: './dist/index.html',
			output: './dist/index.html',
			options: {
				removeAttributeQuotes: true,
			},
			callback: function (err, min) {
				console.log('HTML Saved!');
			},
		});
	});
} catch (err) {
	console.error(`Error: ${err.message}`.red);
}
