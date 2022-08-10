const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

/**
 * Show an error and exit the process.
 * @param {number} error code error 
*/
function showError(error) {
    if (error) {
      console.error(`Error!: ${error}`);
      process.exit(1); 
    }
}

// Execute gh command

/**
 * Makes a GitHub API request and return the result or exit the process if it fails
 * @param  {...any} args arguments for the request 
 * @returns {string} response
*/
function gh(...args) {
    let command = `gh ${args.join('')}`;
    let result = shell.exec(command, { silent: true, stdio: "inherit" });     // silent option don't echo program output to console

    if (result.code != 0) {
        shell.echo(`Error: ${result.stderr}`);
        shell.exit(result.code);
    }

    return result.stdout.replace(/\s+$/,'');
}

/**
 * Get route file from the specified repo and copy it on destiny local route
 * @param {string} repo 
 * @param {string} route 
 * @param {string} dest 
 * @returns {string} response
 */
function copy(repo, route, dest) {
    dest_file = dest + "/" + path.basename(route)

    // check if dest is a directory or a file
    const stats = fs.statSync(dest);

    if(!stats.isDirectory())
        dest_file=dest
    

    // check if dest directory exist
    dest_dir=path.dirname(dest_file)

    if (!fs.existsSync(dest_dir)){
        fs.mkdirSync(dest_dir, { recursive: true });
    }

    gh(` api -H 'accept: application/vnd.github.v3.raw' "repos/${repo}/contents/${route}" > "${dest_file}" `)
    return `File ${route} copied succesfuly`
}

module.exports = {
    copy
}