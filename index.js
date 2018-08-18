const { print, parse, visit, types } = require('recast');
var n = types.namedTypes;
var b = types.builders;

const ast = parse(`
    import _, { get } from 'lodash';
    switch(action.type){
        case SOME_RANDOM_CASE: {
            draft;
        }
    }
`);

function addLiteralToImport(ast, source, literal) {
	visit(ast, {
		visitImportDeclaration: function(path) {
			if (path.node.source.value === source) {
				path.node.specifiers.push(b.importSpecifier(b.identifier(literal)));
			}
			this.traverse(path);
		}
	});
}

function addCaseToSwitch(ast, variable) {
	visit(ast, {
		visitSwitchStatement: function(path) {
			path.node.cases.push(createSwitchCase(variable));
			this.traverse(path);
		}
	});
}

function createSwitchCase(variable) {
	let sCase;
	visit(
		parse(`
        switch(something) {
            case ${variable}: {
                draft;
            }
        }
        `),
		{
			visitSwitchStatement: function(path) {
				sCase = path.node.cases[0];
				this.traverse(path);
			}
		}
	);
	return sCase;
}

addLiteralToImport(ast, 'lodash', 'set');
addCaseToSwitch(ast, 'BECAUSE');

console.log(print(ast).code);
