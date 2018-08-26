const Gen = require('./../../src/Gen');
const Mod = require('./../../src/Mod');
const Case = require('case');

module.exports = function(answers) {
	if (answers.isAsync) {
		const constantName = Case.constant(answers.name);
		const actionName = Case.camel(answers.name);
		const modSaga = new Mod(answers.paths.saga);
		const sagaBody = new Gen.GeneratorFunctionBody(
			`
			try {
				const data = yield call(delay(1000));
				${answers.api ? `yield put(${actionName}Success(data));` : ''}
			} catch (err) {
				// Handle Error				
				${answers.api ? `yield put(${actionName}Failed(err));` : ''}
			}
            `
		).build();
		const sagaFunction = new Gen.GeneratorDeclaration(Case.camel(answers.name), [], sagaBody).export();
		modSaga.addFunction(sagaFunction);

		modSaga.modImportStatement(answers.paths.action, new Gen.ImportSpecifier(actionName).build());
		if (answers.api) {
			modSaga.modImportStatement(
				answers.paths.action,
				new Gen.ImportSpecifier(actionName + 'Success').build()
			);
			modSaga.modImportStatement(
				answers.paths.action,
				new Gen.ImportSpecifier(actionName + 'Failed').build()
			);
		}
		modSaga.modImportStatement(answers.paths.constant, new Gen.ImportSpecifier(constantName).build());

		modSaga.write();
	}
};
