const { print } = require('recast');

const { ObjectDeclaration, ObjectDefinition } = require('../gen');

const ast = new ObjectDeclaration('hey', new ObjectDefinition({ get: true, set: false }).build()).export();

console.log(print(ast).code);
