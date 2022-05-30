const path = require('path');
const fs = require('fs');

const minify = require('@node-minify/core');
const cssnano = require('@node-minify/cssnano');

module.exports = function ($) {
	try {
		return new Promise((resolve, reject) => {
			const cssFilePath = path.join(__dirname, '../dist/css/main.min.css');

			// Loop through all css link tags from the html
			$('link[rel="stylesheet"]').map(function () {
				console.log(`Converting: ${$(this).attr('href')}`.magenta);
				const css = fs.readFileSync(path.join(__dirname, `../src/${$(this).attr('href')}`), 'utf8');

				// Error handling => create bundle file if it doesn't exist
				if (!fs.existsSync(cssFilePath)) {
					fs.writeFileSync(cssFilePath, 'utf-8');
				}

				// Concatenate css into one file
				fs.appendFileSync(cssFilePath, css);

				// Remove css link from html
				$(this).remove();
			});

			// Minifying css file and resaving
			minify({
				compressor: cssnano,
				input: cssFilePath,
				output: cssFilePath,
				callback: (err) => {
					if (err) reject(new Error('minifying css file'));

					// Adding only css bundle script to html head
					$('head').append('<link rel="stylesheet" href="css/main.min.css">');
					resolve();
				},
			});
		});
	} catch (err) {
		console.error(`Error: ${err.message.white}`.red);
		console.log('Build failed, please check the error above.'.brightRed);
	}
};
