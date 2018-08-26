const { print, parse, visit } = require('recast');
const { readFileSync, writeFileSync } = require('fs');
const prettier = require('prettier');
const path = require('path');
const chalk = require('chalk');

module.exports = class BaseMod {
	constructor(filepath) {
		this.filepath = filepath;
		this.file = readFileSync(filepath);
		this.ast = this.parse(this.file);
		const parsedPath = path.parse(this.filepath);
		this.fileDirectory = parsedPath.dir;
		this.fileName = parsedPath.base;
		this.changes = [];
	}

	logChange(change, style = 'grey') {
		console.log(chalk[style](`${this.fileName} \t ${change}`));
		this.changes.push(change);
	}

	parse(code) {
		return parse(code, {
			parser: require('recast/parsers/babylon')
		});
	}

	modifier(visitor, modFunction) {
		visit(this.ast, {
			[`visit${visitor}`]: function(path) {
				modFunction(path);
				this.traverse(path);
			}
		});
	}

	eof(code) {
		this.ast.program.body.push(code);
	}

	afterImportStatements(code) {
		const lastImportIndex = this.ast.program.body.lastIndexOf(body => body.type === 'ImportDeclaration');
		this.ast.program.body.splice(lastImportIndex - 1, 0, code);
	}

	print() {
		return prettier.format(print(this.ast).code, {
			parser: 'babylon'
		});
	}

	write() {
		console.log(chalk.green(`${this.fileName} \t saved`));
		writeFileSync(this.filepath, this.print());
	}

	log() {
		console.log(this.print());
	}
};
