const path = require('path');
const fs = require('fs');

console.log('Hello build script');

fs.readdir(path.join('./src'), (err, files) => {
	files.forEach(file => {
		console.log(file);
	});
});
