const { print, parse, visit } = require('recast');

module.exports = class BaseGen {
	constructor() {
		this.ast;
	}
	getAstFromCode(code, visitor, extractor) {
		let ast;
		visit(this.parse(code), {
			[`visit${visitor}`]: function(path) {
				ast = extractor(path);
				this.traverse(path);
			}
		});
		return ast;
	}
	parse(code) {
		return parse(code, {
			parser: require('recast/parsers/babylon')
		});
	}
	build() {
		return this.ast;
	}

	return() {
		return this.parse(`return ${print(this.ast).code}`);
	}

	export() {
		return this.parse(`export ${print(this.ast).code}`).program.body[0];
	}

	defaultExport() {
		return this.parse(`export default ${print(this.ast).code}`).program.body[0];
	}
};
