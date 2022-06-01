const path = require('path');

const webp = require('webp-converter');
webp.grant_permission();

module.exports = function ($) {
	return new Promise((resolve, reject) => {
		try {
			let finishedImages = 0;

			// Resizing all images and transforming them into webp format
			const htmlImages = $('img');
			const results = htmlImages.map(async function () {
				const imgSrc = $(this).attr('src');
				console.log(`Converting: ${imgSrc}`.cyan);

				// Getting image name (without extension)
				let imgNameSplit = imgSrc.split('.');
				imgNameSplit.pop();
				let imgName = imgNameSplit.join('.');

				// Saving image as webp in "dist" directory
				await webp.cwebp(path.join(__dirname, `../src/${imgSrc}`), path.join(__dirname, `../dist/${imgName}.webp`), '-q 20').then(() => {
					// Changing image src in html file
					$(this).attr('src', `${imgName}.webp`);

					// Resolve after last image
					if (finishedImages === htmlImages.length - 1) resolve();
					else finishedImages += 1;
				});
			});
			// await Promise.all(results)
		} catch (err) {
			console.error(`Error: ${err.message.white}`.red);
			console.log('Build failed, please check the error above.'.brightRed);
			reject(err.message);
		}
	});
};
