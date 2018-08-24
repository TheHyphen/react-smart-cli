const Finder = require('../Finder');
const finder = new Finder(process.cwd());

module.exports = [
	{
		type: 'input',
		message: 'Name of action',
		name: 'name'
	},
	{
		type: 'list',
		message: 'Choose the container',
		name: 'file',
		choices: finder.findContainers()
	},
	{
		type: 'confirm',
		default: false,
		message: 'Async action?',
		name: 'isAsync'
	},
].map(p => ({ ...p, when: a => a.type === 'action' }));
