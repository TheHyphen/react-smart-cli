const Gen = require('./../../src/Gen');
const Mod = require('./../../src/Mod');
const Case = require('case');

module.exports = function(answers) {
	if (answers.isAsync) {
		const constantName = Case.constant(answers.name);
		const modSaga = new Mod(answers.paths.saga);
		const sagaBody = new Gen.GeneratorFunctionBody(
			`
            yield takeLatest(${constantName});
            `
		).build();
		const sagaFunction = new Gen.GeneratorDeclaration(Case.camel(answers.name), [], sagaBody).export();
		modSaga.addFunction(sagaFunction);

		modSaga.modImportStatement(answers.paths.constant, new Gen.ImportSpecifier(constantName).build());

		modSaga.write();
	}
};
