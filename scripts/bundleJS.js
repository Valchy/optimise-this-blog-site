const path = require('path');
const fs = require('fs');

const minify = require('@node-minify/core');
const uglifyES = require('@node-minify/uglify-es');
const hashFiles = require('hash-files');

module.exports = async function ($) {
	const jsFilePath = (hash = '') => path.join(__dirname, `../dist/js/bundle${hash}.min.js`);

	// Loop through all js script tags from the html
	$('script[src]').map(function () {
		console.log(`Converting: ${$(this).attr('src')}`.red);
		const js = fs.readFileSync(path.join(__dirname, `../src/${$(this).attr('src')}`), 'utf8');

		// Error handling => create bundle file if it doesn't exist
		if (!fs.existsSync(jsFilePath())) {
			fs.writeFileSync(jsFilePath(), '');
		}

		// Concatenate js into one file
		fs.appendFileSync(jsFilePath(), js);

		// Remove js script from html
		$(this).remove();
	});

	// Minifying js file and resaving
	await minify({
		compressor: uglifyES,
		input: jsFilePath(),
		output: jsFilePath(),
	});

	// Hashing js file and then versioning it
	const hash = hashFiles.sync({ files: [jsFilePath()], algorithms: 'sha256' });

	// Renaming js bundle file to include content hash
	fs.renameSync(jsFilePath(), jsFilePath(`.${hash}`));

	// Adding js bundle script to html head
	$('body').append(`<script src="js/bundle.${hash}.min.js"></script>`);

	// Service worker exception (copied and minified over to dist folder)
	console.log('Converting: js/serviceWorker.js'.red);
	await minify({
		compressor: uglifyES,
		input: path.join(__dirname, '../src/js/serviceWorker.js'),
		output: path.join(__dirname, '../dist/js/serviceWorker.js'),
	});
};
