const glob = require('glob');
const { readdirSync } = require('fs');
const path = require('path');
const config = require('./../../config');

module.exports = class Finder {
	constructor(projectRoot) {
		this.root = projectRoot;
	}

	findContaining(pattern) {
		return glob.sync(`**/*${pattern}*`, {
			cwd: this.root
		});
	}

	// TODO: following should not be [0]
	findReducer() {
		return path.join(this.root, this.findContaining(config.reducerGlob)[0]);
	}

	findAction() {
		return path.join(this.root, this.findContaining(config.actionGlob)[0]);
	}

	findConstant() {
		return path.join(this.root, this.findContaining(config.constantGlob)[0]);
	}
	
	findSaga() {
		return path.join(this.root, this.findContaining(config.sagaGlob)[0]);
	}

	// expected to have all the containers in one place - how often is this possible?
	findContainers() {
		return readdirSync(path.join(this.root, config.containersPath));
	}
};
