const path = require('path');
const fs = require('fs');

const minify = require('@node-minify/core');
const htmlMinifier = require('@node-minify/html-minifier');

module.exports = function ($) {
	try {
		return new Promise((resolve, reject) => {
			const htmlFilePath = path.join(__dirname, '../dist/index.html');

			fs.writeFile(htmlFilePath, $.html(), function (err) {
				if (err) reject(new Error('writing html file'));

				minify({
					compressor: htmlMinifier,
					input: htmlFilePath,
					output: htmlFilePath,
					options: { removeAttributeQuotes: true },
					callback: function (err) {
						if (err) reject(new Error('minifying html file'));

						console.log('\nSuccessful build...'.brightGreen);
						console.log('Happy hacking!'.brightGreen);
						resolve();
					},
				});
			});
		});
	} catch (err) {
		console.error(`Error: ${err.message.white}`.red);
		console.log('Build failed, please check the error above.'.brightRed);
	}
};
