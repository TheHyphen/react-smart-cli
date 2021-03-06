const { readdirSync } = require('fs');
const path = require('path');

const { flatten } = require('lodash');

module.exports = flatten(
	readdirSync(__dirname)
		.filter(file => file !== 'index.js')
		.map(file =>
			require(path.join(__dirname, file)).map(p => ({
				...p,
				when: a => a.type === file.replace('.js', '') && (p.when ? p.when(a) : true)
			}))
		)
);
