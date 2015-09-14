'use strict';

var path    = require('path');
var args    = process.argv.slice(2);

var argv = require('yargs')
    .command('install', 'travis install trigger', function(yargs){

    })
    .strict()
    .argv;

var command = argv._[0];

console.log('Travis node script, command:', command);