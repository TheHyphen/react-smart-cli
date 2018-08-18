const BaseGen = require('./../BaseGen');
module.exports = class SwitchCase extends BaseGen {
	constructor(variable) {
		super();
		this.ast = this.getAstFromCode(
			`
			switch(something) {
				case ${variable}: {
				
				}
			}
		`,
			'SwitchCase',
			path => path.value
		);

		return this;
	}
};
