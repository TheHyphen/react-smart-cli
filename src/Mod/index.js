const BaseMod = require('./BaseMod');
module.exports = class Mod extends BaseMod {

	addSwitchCase(sCase) {
		this.modifier('SwitchStatement', path => path.node.cases.push(sCase));
	}

	addConstant(constant) {
		this.eof(constant);
    }
    
    addImportStatement(statement) {
        this.afterImportStatements(statement);
	}
	
	addFunction(fn) {
		this.eof(fn);
	}
};
