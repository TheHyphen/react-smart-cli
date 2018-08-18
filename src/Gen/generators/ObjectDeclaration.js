const { print } = require('recast');
const BaseGen = require('./../BaseGen');
module.exports = class ObjectDeclaration extends BaseGen {
	constructor(objectName, objectExpression) {
		super();
		this.ast = this.getAstFromCode(
			`const ${objectName} = ${print(objectExpression).code}`,
			'VariableDeclaration',
			path => path.value
		);
		return this;
	}
};
