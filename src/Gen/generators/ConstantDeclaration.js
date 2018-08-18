const BaseGen = require("./../BaseGen");
module.exports = class ConstantDeclaration extends BaseGen {
  constructor(variableName, variableValue) {
    super();
    this.ast = this.getAstFromCode(
      `const ${variableName} = '${variableValue}';`,
      "VariableDeclaration",
      path => path.node
    );

    return this;
  }
};
