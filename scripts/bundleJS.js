const path = require('path');
const fs = require('fs');

const minify = require('@node-minify/core');
const uglifyES = require('@node-minify/uglify-es');

module.exports = function ($) {
	try {
		return new Promise((resolve, reject) => {
			const jsFilePath = path.join(__dirname, '../dist/js/bundle.min.js');

			// Loop through all js script tags from the html
			$('script[src]').map(function () {
				console.log(`Converting: ${$(this).attr('src')}`.red);
				const js = fs.readFileSync(path.join(__dirname, `../src/${$(this).attr('src')}`), 'utf8');

				// Error handling => create bundle file if it doesn't exist
				if (!fs.existsSync(jsFilePath)) {
					fs.writeFileSync(jsFilePath, 'utf-8');
				}

				// Concatenate js into one file
				fs.appendFileSync(jsFilePath, js);

				// Remove js script from html
				$(this).remove();
			});

			// Minifying js file and resaving
			minify({
				compressor: uglifyES,
				input: jsFilePath,
				output: jsFilePath,
				callback: (err) => {
					if (err) reject('minifying js file');

					// Adding only js bundle script to html body
					$('body').append('<script src="js/bundle.min.js"></script>');
					resolve();
				},
			});
		});
	} catch (err) {
		console.error(`Error: ${err.message.white}`.red);
		console.log('Build failed, please check the error above.'.brightRed);
	}
};
