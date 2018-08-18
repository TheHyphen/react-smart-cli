const BaseGen = require("./../BaseGen");
const { parse } = require('recast');
module.exports = class Identifier extends BaseGen {
  constructor(variableName) {
    super();
    this.ast = parse(`${variableName}`);
    return this;
  }
};
