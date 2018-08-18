const { print } = require('recast');
const Gen = require('./../gen');

const gen = new Gen();
const g2 = new Gen();

const code = gen.objectDeclaration('hey', g2.objectDefinition({ get: true, set: false }).build()).export();

console.log(print(code).code);
