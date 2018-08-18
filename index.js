const inquirer = require('inquirer');
const Gen = require('./src/Gen');
const Mod = require('./src/Mod');
const Case = require('case');

inquirer
	.prompt([
		{
			type: 'list',
			choices: ['action'],
			name: 'chosen'
		},
		{
			type: 'input',
			name: 'action',
			when: ({ chosen }) => chosen === 'action'
		}
	])
	.then(({ chosen, action }) => {
		switch (chosen) {
			case 'action': {
				const constantName = Case.constant(action);
				const constantValue = Case.title(action);
				const actionName = Case.camel(action);

				const switchCase = new Gen.SwitchCase(action).build();

				const actionFunctionBody = new Gen.Identifier('data').return();
				const actionFunction = new Gen.FunctionDeclaration(
					actionName,
					['data'],
					actionFunctionBody
				).export();

				const constant = new Gen.ConstantDeclaration(constantName, constantValue).export();

				const reducerMod = new Mod(__dirname + '/resources/reducer.js');
				const actionsMod = new Mod(__dirname + '/resources/action.js');
				const constantsMod = new Mod(__dirname + '/resources/constants.js');

				reducerMod.addSwitchCase(switchCase);
				reducerMod.write();

				actionsMod.addFunction(actionFunction);
				actionsMod.write();

				constantsMod.addConstant(constant);
				constantsMod.write();

				break;
			}
			default:
				break;
		}
	});
