const path = require('path');
const fs = require('fs');

const minify = require('@node-minify/core');
const uglifyES = require('@node-minify/uglify-es');
const hashFiles = require('hash-files');

module.exports = function ($) {
	try {
		return new Promise((resolve, reject) => {
			const jsFilePath = (hash = '') => path.join(__dirname, `../dist/js/bundle${hash}.min.js`);

			// Loop through all js script tags from the html
			$('script[src]').map(function () {
				console.log(`Converting: ${$(this).attr('src')}`.red);
				const js = fs.readFileSync(path.join(__dirname, `../src/${$(this).attr('src')}`), 'utf8');

				// Error handling => create bundle file if it doesn't exist
				if (!fs.existsSync(jsFilePath())) {
					fs.writeFileSync(jsFilePath(), 'utf-8');
				}

				// Concatenate js into one file
				fs.appendFileSync(jsFilePath(), js);

				// Remove js script from html
				$(this).remove();
			});

			// Minifying js file and resaving
			minify({
				compressor: uglifyES,
				input: jsFilePath(),
				output: jsFilePath(),
				callback: (err) => {
					if (err) reject('minifying js file');

					// Hashing js file and then versioning it
					hashFiles({ files: [jsFilePath()], algorithms: 'sha256' }, (err, hash) => {
						if (err) reject(new Error('hashing js file'));

						// Renaming js bundle file to include content hash
						fs.renameSync(jsFilePath(), jsFilePath(`.${hash}`));

						// Adding js bundle script to html head
						$('body').append(`<script src="js/bundle.${hash}.min.js"></script>`);
						resolve();
					});
				},
			});
		});
	} catch (err) {
		console.error(`Error: ${err.message.white}`.red);
		console.log('Build failed, please check the error above.'.brightRed);
	}
};
