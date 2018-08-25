const { print } = require('recast');
const BaseGen = require('./../BaseGen');
module.exports = class GeneratorDeclaration extends BaseGen {
	constructor(generatorName, args, body) {
		super();
		this.ast = this.getAstFromCode(
			`
			function* ${generatorName} (${args.join(', ')}) {
				${body ? print(body).code : ''}
			}
		`,
			'FunctionDeclaration',
			path => path.node
		);

		return this;
	}
};
