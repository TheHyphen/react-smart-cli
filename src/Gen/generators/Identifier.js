const BaseGen = require("./../BaseGen");
module.exports = class Identifier extends BaseGen {
  constructor(variableName) {
    super();
    this.ast = parse(`${variableName}`);
    return this;
  }
};
