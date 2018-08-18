const { print, parse, visit, types } = require('recast');
const b = require('ast-types').builders;
const t = require('ast-types').builtInTypes;

module.exports = class Gen {
	constructor() {
		this.ast;
	}

	getAstFromCode(code, visitor, extractor) {
		let ast;
		visit(parse(code), {
			[`visit${visitor}`]: function(path) {
				ast = extractor(path);
				this.traverse(path);
			}
		});
		return ast;
	}

	build() {
		return this.ast;
	}

	return() {
		return parse(`return ${print(this.ast).code}`);
	}

	export() {
		return parse(`export ${print(this.ast).code}`);
	}

	defaultExport() {
		return parse(`export default ${print(this.ast).code}`);
	}

	shouldExportVisitor(shouldExport, visitor) {
		return shouldExport ? 'ExportNamedDeclaration' : visitor;
	}

	switchCase(variable) {
		this.ast = this.getAstFromCode(
			`
                switch(something) {
                    case ${variable}: {
                    
                    }
                }
            `,
			'SwitchCase',
			path => path.value
		);

		return this;
	}

	identifier(variableName) {
		this.ast = parse(`${variableName}`);
		return this;
	}

	importDeclaration(variableName, variableSource, defaultImport) {
		this.ast = this.getAstFromCode(
			`
                import ${
					defaultImport ? defaultImport + ', ' : ''
				} { ${variableName} } from "${variableSource}";
            `,
			'ImportDeclaration',
			path => path.node
		);

		return this;
	}

	importSpecifier(variable) {
		this.ast = this.getAstFromCode(
			`
                import { ${variable} } from 'something';
            `,
			'ImportSpecifier',
			path => path.node
		);

		return this;
	}

	constantDeclaration(variableName, variableValue) {
		this.ast = this.getAstFromCode(
			`const ${variableName} = '${variableValue}';`,
			'VariableDeclaration',
			path => path.node
		);

		return this;
	}

	objectDeclaration(objectName, objectExpression) {
		this.ast = this.getAstFromCode(
			`const ${objectName} = ${print(objectExpression).code}`,
			'VariableDeclaration',
			path => path.value
		);
		return this;
	}

	objectDefinition(props) {
		this.ast = this.getAstFromCode(
			`
			const something = {
				${Object.keys(props)
					.map(key => `${key}: ${props[key]}`)
					.join(',\n')}
				}
				`,
			'ObjectExpression',
			path => path.value
		);
		return this;
	}

	functionDeclaration(functionName, args, body) {
		this.ast = this.getAstFromCode(
			`
                function ${functionName} (${args.join(', ')}) {
                    ${print(body).code}
                }
            `,
			'FunctionDeclaration',
			path => path.node
		);

		return this;
	}
};
