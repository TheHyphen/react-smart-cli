#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const generators = fs
	.readdirSync(path.join(__dirname, 'src/Prompts'))
	.filter(name => name !== 'index.js')
	.map(name => name.replace('.js', ''));

const prompts = require(path.join(__dirname, 'src/Prompts'));
const steps = require(path.join(__dirname, 'src/Steps'));

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
	.then(answers => steps[answers.type](answers));
