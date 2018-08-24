const { readdirSync } = require('fs');
const path = require('path');

module.exports = readdirSync(__dirname)
	.filter(file => file !== 'index.js')
	.reduce((obj, file) => ({ ...obj, [file.replace('.js', '')]: require(path.join(__dirname, file)) }), {});
