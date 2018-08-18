const BaseGen = require("./../BaseGen");
module.exports = class ImportSpecifier extends BaseGen {
  constructor(variable) {
    super();
    this.ast = this.getAstFromCode(
      `
			import { ${variable} } from 'something';
		`,
      "ImportSpecifier",
      path => path.node
    );

    return this;
  }
};
