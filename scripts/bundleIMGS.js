const path = require('path');
const fs = require('fs');

const resizeImg = require('resize-img');
const webp = require('webp-converter');
webp.grant_permission();

module.exports = async function ($) {
	try {
		// Resizing all images and transforming them into webp format
		$('img').map(async function () {
			console.log(`Converting: ${$(this).attr('src')}`.cyan);

			const resizedImage = await resizeImg(fs.readFileSync(path.join(__dirname, `../src/${$(this).attr('src')}`)), {
				width: 128,
				height: 128,
			});

			fs.writeFileSync(path.join(__dirname, `../dist/${$(this).attr('src')}`), resizedImage);

			// let webpImage = webp.cwebp(resizedImage, 'webp', '-q 80');
			// webpImage.then(function (webpImage) {
			// 	fs.writeFileSync(path.join(__dirname, `./dist/${$(this).attr('src')}`), webpImage);
			// });

			// $(this).attr('src', 'random.jpg');
		});
	} catch (err) {
		console.error(`Error: ${err.message.white}`.red);
		console.log('Build failed, please check the error above.'.brightRed);
	}
};
