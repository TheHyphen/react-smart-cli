const { print, parse, visit, types } = require('recast');

module.exports = class BaseGen {
	constructor() {
		this.ast;
	}
	getAstFromCode(code, visitor, extractor) {
		let ast;
		visit(parse(code), {
			[`visit${visitor}`]: function(path) {
				ast = extractor(path);
				this.traverse(path);
			}
		});
		return ast;
	}
	build() {
		return this.ast;
	}

	return() {
		return parse(`return ${print(this.ast).code}`);
	}

	export() {
		return parse(`export ${print(this.ast).code}`).program.body[0];
	}

	defaultExport() {
		return parse(`export default ${print(this.ast).code}`).program.body[0];
	}
}
