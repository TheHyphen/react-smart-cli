const Gen = require('./../Gen');
const Mod = require('./../Mod');
const Case = require('case');
const path = require('path');

module.exports = function({ name, isAsync, paths }) {
	worker(name, paths);
	if (isAsync) {
		worker(`${name}Success`, paths);
		worker(`${name}Failed`, paths);
	}
};

function worker(name, paths) {
	const constantName = Case.constant(name);
	const constantValue = Case.title(name);
	const constant = new Gen.ConstantDeclaration(constantName, constantValue).export();

	const switchCase = new Gen.SwitchCase(constantName).build();

	const actionName = Case.camel(name);
	const actionBody = new Gen.ObjectDefinition({
		type: constantName,
		data: 'data'
	}).return();
	const actionFunction = new Gen.FunctionDeclaration(actionName, ['data'], actionBody).export();

	const reducerMod = new Mod(path.join(paths.reducer));
	const actionsMod = new Mod(path.join(paths.action));
	const constantsMod = new Mod(path.join(paths.constant));

	reducerMod.addSwitchCase(switchCase);
	actionsMod.addFunction(actionFunction);
	constantsMod.addConstant(constant);

	reducerMod.write();
	actionsMod.write();
	constantsMod.write();
}
