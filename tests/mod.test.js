const Mod = require('./../src/Mod');
const Gen = require('./../src/Gen');
const path = require('path');

const mod = new Mod(path.join(__dirname, 'reducer.test.js'));

mod.addSwitchCase(new Gen.SwitchCase('FIRST_CASE').build());

mod.addConstant(new Gen.ConstantDeclaration('FIRST_CASE', 'firstCase', false).export());

mod.addImportStatement(new Gen.ImportDeclaration('set', 'lodash'));

mod.addFunction(new Gen.FunctionDeclaration('secondAction', ['data']));

mod.log();
