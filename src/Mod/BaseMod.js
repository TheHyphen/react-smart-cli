const { print, parse, visit } = require('recast');
const { readFileSync, writeFileSync } = require('fs');
const prettier = require('prettier');
const path = require('path');

module.exports = class BaseMod {
	constructor(filepath) {
		this.filepath = filepath;
		this.file = readFileSync(filepath);
		this.ast = this.parse(this.file);

		const directories = this.filepath.split(path.sep);
		directories.pop();
		this.fileDirectory = directories.join(path.sep);
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
		console.log(`${this.filepath} modified`);
		writeFileSync(this.filepath, this.print());
	}

	log() {
		console.log(this.print());
	}
};
