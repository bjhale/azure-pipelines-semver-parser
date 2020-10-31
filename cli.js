#!/usr/bin/env node
const argv = require('yargs')
    .usage("Usage: $0 <version>")
    .command('$0 <versionstring>', 'parses a version string writing its components to console using ADO logging commands.')
    .demandCommand()
    .help()
    .argv;

const regex = /^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<buildmetadata>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?(?:\@(?<tag>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/

//Trim leading 'v' character from version string if present.
let versionString = argv.versionstring.replace(/^v/,"");

//Test version string for validity.
if(!regex.test(versionString)){
  console.log('Error: Version string is invalid.');
  process.exit(1);
}

//Match version string and extract named groups.
let version = versionString.match(regex).groups;

//Add core property from constituent pieces.
version.core = [version.major, version.minor, version.patch].join('.');

//Output ADO logging commands.
for (const property in version){
  console.log(`###vso[task.setvariable variable=semver_${property}]${version[property]}`);
}



