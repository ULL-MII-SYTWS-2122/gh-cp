
const shell = require('shelljs');
const { Command } = require('commander');
const path = require('path');
const fs = require("fs");

const program = new Command();
program.version(require(path.join(__dirname,'package.json')).version);

program
    .name("gh cp <repo> <route> <dest>")

program.parse(process.argv);
if (process.argv.length === 1) program.help();

function exec(executable, ...args) {
    let command = `${executable} ${args.join('')}`;
    let result = shell.exec(command, {silent: true});
    if (result.code !== 0) {
      shell.echo(`Error: Command "${command}" failed\n${result.stderr}`);
      shell.exit(result.code);
    }    
    return result.stdout.replace(/\s+$/,'');
}

const gh = (...args) => exec("gh", ...args);

function showError(error) {
    if (error) {
      throw(`Error!: ${error}`);
    }
  }

try {
    if (!shell.which('git')) {
        showError('Sorry, this extension requires git installed!');
    }
    
    if (!shell.which('gh')) {
        showError('Sorry, this extension requires GitHub Cli (gh) installed!');
    }
    
    if(!program.opts() && !program.args[0]) {
        showError('Sorry, all args are required');
    }

    repo = program.args[0]
    route = program.args[1]
    dest = program.args[2]
   

    dest_file = dest + "/" + path.basename(route)

    // check if dest is a directory or a file
    const stats = fs.statSync(dest);

    if(!stats.isDirectory())
        dest_file=dest
    

    // check if dest directory exist
    dest_dir=path.dirname(dest_file)

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    gh(` api -H 'accept: application/vnd.github.v3.raw' "repos/${repo}/contents/${route}" > "${dest_file}" `)
    console.log(`File ${route} copied succesfuly`);
}
catch(error) {
    console.log(error);
}
