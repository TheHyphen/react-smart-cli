const BaseGen = require("./../BaseGen");
module.exports = class FunctionBody extends BaseGen {
  constructor(bodyString) {
    super();
    this.ast = this.getAstFromCode(
      `function something() {
          ${bodyString}
      }`,
      "FunctionDeclaration",
      path => path.value.body
    );

    return this;
  }
};
