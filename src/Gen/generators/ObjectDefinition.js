const BaseGen = require("./../BaseGen");
module.exports = class ObjectDefinition extends BaseGen {
  constructor(props) {
    super();
    this.ast = this.getAstFromCode(
      `
		const something = {
			${Object.keys(props)
        .map(key => `${key}: ${props[key]}`)
        .join(",\n")}
			}
			`,
      "ObjectExpression",
      path => path.value
    );
    return this;
  }
};
