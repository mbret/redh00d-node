/**
 * Created by bretm on 8/10/2015.
 */
var path                    = require('path');
var util                    = require('util');
global._                    = require('lodash');
process.env.APP_ROOT_PATH   = path.join(__dirname, '..', '..');
var mysql                   = require('mysql');
var UserRole                = require(path.join(process.env.APP_ROOT_PATH, 'api', 'models', 'UserRole.js'));
var User                    = require(path.join(process.env.APP_ROOT_PATH, 'api', 'models', 'User.js'));
var UserPassport            = require(path.join(process.env.APP_ROOT_PATH, 'api', 'models', 'UserPassport.js'));
var connection              = mysql.createConnection({
    host     : 'localhost',
    user     : 'redh00d',
    password : 'redh00d',
    database : 'redh00d'
});

connection.connect();

var reset = require(path.join(__dirname, 'reset.js'));
reset(connection);

var init = require(path.join(__dirname, 'init.js'));
init(connection);

connection.end();
