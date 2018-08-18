const BaseGen = require("./../BaseGen");
module.exports = class ImportDeclaration extends BaseGen {
  constructor(variableName, variableSource, defaultImport) {
    super();
    this.ast = this.getAstFromCode(
      `
			import ${
        defaultImport ? defaultImport + ", " : ""
      } { ${variableName} } from "${variableSource}";
		`,
      "ImportDeclaration",
      path => path.node
    );

    return this;
  }
};
