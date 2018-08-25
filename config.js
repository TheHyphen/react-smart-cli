const fs = require('fs');
const path = require('path');
const { get } = require('lodash');

const paths = [path.join(__dirname, 'config.json'), path.join(process.cwd(), 'rb-cli.json')];

const config = paths.reduce((acc, path) => {
	try {
		return {
			...acc,
			...JSON.parse(fs.readFileSync(path))
		};
	} catch (error) {
		return acc;
	}
}, {});

const package = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));

module.exports = {
	...config,
	...get(package, 'rb-cli', {})
};
