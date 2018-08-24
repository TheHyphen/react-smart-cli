const glob = require('glob');
const { readdirSync } = require('fs');
const path = require('path');

module.exports = class Finder {
	constructor(projectRoot) {
		this.root = projectRoot;
	}

	findContaining(pattern) {
		return glob.sync(`**/*${pattern}*`, {
			cwd: this.root
		});
	}

	findReducer() {
		return this.findContaining('reducer');
	}

	findAction() {
		return this.findContaining('action');
	}

	findConstant() {
		return this.findContaining('constant');
	}

	// expected to have all the containers in one place - how often is this possible?
	findContainers() {
		return readdirSync(path.join(this.root, 'app/containers'));
	}
};
