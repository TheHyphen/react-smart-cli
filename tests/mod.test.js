const Mod = require('./../mod');
const Gen = require('./../gen');
const path = require('path');

const mod = new Mod(path.join(__dirname, 'reducer.test.js'));
const gen = new Gen();

mod.addSwitchCase(gen.switchCase('FIRST_CASE').build());

mod.addConstant(gen.constantDeclaration('FIRST_CASE', 'firstCase', false).export());

mod.addImportStatement(gen.importDeclaration('set', 'lodash'));

mod.addFunction(gen.functionDeclaration('secondAction', ['data']));

mod.log();
