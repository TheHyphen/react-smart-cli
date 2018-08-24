const Gen = require('./../Gen');
const Mod = require('./../Mod');
const Case = require('case');
const path = require('path');

module.exports = function({ name, isAsync }) {
	worker(name);
	if(isAsync) {
		worker(`${name}Success`);
		worker(`${name}Failed`);
	}
};

function worker(name) {
	const constantName = Case.constant(name);
	const constantValue = Case.title(name);
	const constant = new Gen.ConstantDeclaration(constantName, constantValue).export();

	const switchCase = new Gen.SwitchCase(constantName).build();

	const actionName = Case.camel(name);
	const actionFunctionBody = new Gen.Identifier('data').return();
	const actionFunction = new Gen.FunctionDeclaration(actionName, ['data'], actionFunctionBody).export();

	const reducerMod = new Mod(path.join(__dirname, '..', '..', '/resources/reducer.js'));
	const actionsMod = new Mod(path.join(__dirname, '..', '..', '/resources/action.js'));
	const constantsMod = new Mod(path.join(__dirname, '..', '..', '/resources/constants.js'));

	reducerMod.addSwitchCase(switchCase);
	actionsMod.addFunction(actionFunction);
	constantsMod.addConstant(constant);

	reducerMod.write();
	actionsMod.write();
	constantsMod.write();
}
