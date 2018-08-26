const BaseMod = require('./BaseMod');
const Gen = require('./../Gen');

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
		let statementFound = false;
		this.modifier('ImportDeclaration', ({ value }) => {
			if (path.resolve(this.fileDirectory, value.source.value) === source.replace('.js', '')) {
				// TODO: analyse value.specifiers to handle `import * as something` case
				value.specifiers.push(importSpecifier);
				statementFound = true;
			}
		});
		if (!statementFound) {
			const importName = importSpecifier.imported.name;
			const gen = new Gen.ImportDeclaration(
				importName,
				`./${path.relative(this.fileDirectory, source.replace('.js', ''))}`
			).build();
			this.addImportStatement(gen);
		}
	}

	addFunction(fn) {
		this.eof(fn);
	}
};
