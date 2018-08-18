const { print } = require('recast');
const BaseGen = require('./../BaseGen');
module.exports = class FunctionDeclaration extends BaseGen {
	constructor(functionName, args, body) {
		super();
		this.ast = this.getAstFromCode(
			`
			function ${functionName} (${args.join(', ')}) {
				${body ? print(body).code : ''}
			}
		`,
			'FunctionDeclaration',
			path => path.node
		);

		return this;
	}
};
