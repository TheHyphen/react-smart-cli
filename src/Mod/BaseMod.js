const { print, parse, visit } = require('recast');
const { readFileSync, writeFileSync } = require('fs');

module.exports = class BaseMod {
	constructor(filepath) {
		this.filepath = filepath;
		this.file = readFileSync(filepath);
		this.ast = parse(this.file);
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
		return print(this.ast).code;
	}

	write() {
		writeFileSync(this.filepath, this.print());
	}

	log() {
		console.log(this.print());
	}
};
