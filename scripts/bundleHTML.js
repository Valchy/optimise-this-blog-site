const path = require('path');
const fs = require('fs');

const minify = require('@node-minify/core');
const htmlMinifier = require('@node-minify/html-minifier');

module.exports = async function ($) {
	const htmlFilePath = path.join(__dirname, '../dist/index.html');

	// Write the modified html to the "dist" directory
	fs.writeFileSync(htmlFilePath, $.html());

	// Minify the html file
	await minify({
		compressor: htmlMinifier,
		input: htmlFilePath,
		output: htmlFilePath,
		options: { removeAttributeQuotes: false },
	});

	// Alert successful build
	console.log('\nSuccessful build...'.brightGreen);
	console.log('Happy hacking!'.brightGreen);
};
