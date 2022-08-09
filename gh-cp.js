#!/usr/bin/env node
const shell = require('shelljs');
const { Command } = require('commander');
const path = require('path');

const { copy } = require('./cp');

const program = new Command();
program.version(require(path.join(__dirname,'package.json')).version);

program
    .name("gh cp <repo> <route> <dest>")

program.parse(process.argv);
if (process.argv.length === 1) program.help();

function showError(error) {
    if (error) {
      throw(`Error!: ${error}`);
    }
  }

try {
    if (!shell.which('git')) {
        showError('Sorry, this extension requires git installed!');
    }
    
    else if (!shell.which('gh')) {
        showError('Sorry, this extension requires GitHub Cli (gh) installed!');
    }
    
    else if(!program.opts() && !program.args[0]) {
        showError('Sorry, all args are required');
    }

    else {
        console.log(copy(program.args[0], program.args[1], program.args[2]));
    }
}
catch(error) {
    console.log(error);
}
