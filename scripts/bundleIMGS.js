const path = require('path');

const webp = require('webp-converter');
webp.grant_permission();

module.exports = async function ($) {
	// Resizing all images and transforming them into webp format
	const htmlImages = $('img, source');
	const results = htmlImages.map(async function () {
		const imgAttribute = $(this).attr('srcset') ? 'srcset' : 'src';
		const imgSrc = $(this).attr(imgAttribute);
		console.log(`Converting: ${imgSrc}`.cyan);

		// Getting image name (without extension)
		let imgNameSplit = imgSrc.split('.');
		imgNameSplit.pop();
		let imgName = imgNameSplit.join('.');

		// Saving image as webp in "dist" directory
		await webp.cwebp(path.join(__dirname, `../src/${imgSrc}`), path.join(__dirname, `../dist/${imgName}.webp`), '-q 20');

		// Changing image src in html file
		$(this).attr(imgAttribute, `${imgName}.webp`);
	});

	// Await for all images to finish processing
	await Promise.all(results);
};
