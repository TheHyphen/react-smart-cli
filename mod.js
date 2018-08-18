const { print, parse, visit, types } = require('recast');
const { readFileSync, writeFileSync } = require('fs');

module.exports = class Mod {
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

	addSwitchCase(sCase) {
		this.modifier('SwitchStatement', path => path.node.cases.push(sCase));
	}

	addConstant(constant) {
		this.eof(constant);
    }
    
    addImportStatement(statement) {
        this.afterImportStatements(statement);
	}
	
	addFunction(fn) {
		this.eof(fn);
	}

	print() {
		return print(this.ast).code;
	}

	write() {
		writeFileSync(this.print());
	}

	log() {
		console.log(this.print());
	}
};
