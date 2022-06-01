const path = require('path');
const fs = require('fs');

const minify = require('@node-minify/core');
const cssnano = require('@node-minify/cssnano');
const hashFiles = require('hash-files');

module.exports = async function ($) {
	const cssFilePath = (hash = '') => path.join(__dirname, `../dist/css/main${hash}.min.css`);

	// Loop through all css link tags from the html
	$('link[rel="stylesheet"]').map(function () {
		console.log(`Converting: ${$(this).attr('href')}`.magenta);
		const css = fs.readFileSync(path.join(__dirname, `../src/${$(this).attr('href')}`), 'utf8');

		// Error handling => create bundle file if it doesn't exist
		if (!fs.existsSync(cssFilePath())) {
			fs.writeFileSync(cssFilePath(), '');
		}

		// Concatenate css into one file
		fs.appendFileSync(cssFilePath(), css);

		// Remove css link from html
		$(this).remove();
	});

	// Minifying css file and resaving
	await minify({
		compressor: cssnano,
		input: cssFilePath(),
		output: cssFilePath(),
	});

	// Hashing css file and then versioning it
	const hash = hashFiles.sync({ files: [cssFilePath()], algorithms: 'sha256' });

	// Renaming css bundle file to include content hash
	fs.renameSync(cssFilePath(), cssFilePath(`.${hash}`));

	// Adding css bundle script to html head
	$('head').append(`<link rel="stylesheet" href="css/main.${hash}.min.css">`);
};
