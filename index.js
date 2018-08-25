#!/usr/bin/env node
const { get, noop } = require('lodash');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const Finder = require('./src/Finder');
const config = require('./config');

const generators = fs
	.readdirSync(path.join(__dirname, 'src/Prompts'))
	.filter(name => name !== 'index.js')
	.map(name => name.replace('.js', ''));

const prompts = require(path.join(__dirname, 'src/Prompts'));
const steps = require(path.join(__dirname, 'src/Steps'));
const templates = {
	...fs.readdirSync(path.join(__dirname, 'templates', config.template)).reduce(
		(t, file) => ({
			...t,
			[file.replace('.js', '')]: require(path.join(__dirname, 'templates', config.template, file))
		}),
		{}
	),
	...(config.templatePath
		? fs.readdirSync(path.join(__dirname, config.templatePath, config.template)).reduce(
				(t, file) => ({
					...t,
					[file.replace('.js', '')]: require(file)
				}),
				{}
		  )
		: {})
};

inquirer
	.prompt([
		{
			type: 'list',
			choices: generators,
			name: 'type',
			message: 'Choose the type of generator'
		},
		...prompts
	])
	.then(answers => {
		if (answers.container) {
			const finder = new Finder(path.join(process.cwd(), config.containersPath, answers.container));
			return Promise.resolve({
				...answers,
				paths: {
					reducer: finder.findReducer(),
					action: finder.findAction(),
					constant: finder.findConstant(),
					saga: finder.findSaga()
				}
			});
		} else {
			return Promise.resolve(answers);
		}
	})
	.then(answers => {
		steps[answers.type](answers);
		get(templates, answers.type, noop)(answers);
	});
