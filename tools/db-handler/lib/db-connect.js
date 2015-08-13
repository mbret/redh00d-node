(function(){
    'use strict';

    var _           = require('lodash');
    var path        = require('path');
    var fs          = require('fs');
    var mysql       = require('mysql');
    var UserError   = require(path.join(process.env.LIB_PATH, 'user-error.js'));
    var script      = require(process.env.SCRIPT_PATH);

    module.exports = function(cb){

        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'redh00d',
            password : 'redh00d',
            database : 'redh00d'
        });

        script.on('shutdown', function(){
            connection.end(function(err){
                script.logger.yellow('The connection to the database has been closed');
            });
        });

        connection.connect(function(err){
            if(err){
                return cb(err);
            }
            script.logger.yellow('The connection to the database has been established');
            cb(null, connection);
        });

    };

})();