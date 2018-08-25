const BaseMod = require('./BaseMod');
const path = require('path');
module.exports = class Mod extends BaseMod {
	addSwitchCase(sCase) {
		this.modifier('SwitchStatement', path => {
			path.value.cases.push(sCase);
		});
	}

	addConstant(constant) {
		this.eof(constant);
	}

	addImportStatement(statement) {
		this.afterImportStatements(statement);
	}

	modImportStatement(source, importSpecifier) {
		this.modifier('ImportDeclaration', ({ value }) => {
			if (source.includes(path.join(this.fileDirectory, value.source.value))) {
				// TODO: analyse value.specifiers to handle `import * as something` case
				value.specifiers.push(importSpecifier);
			}
		});
	}

	addFunction(fn) {
		this.eof(fn);
	}
};
