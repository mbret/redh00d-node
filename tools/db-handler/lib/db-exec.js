(function(){
    'use strict';

    var path        = require('path');
    var util        = require('util');
    var _           = require('lodash');
    var dbConnect   = require(path.join(__dirname, 'db-connect.js'));

    module.exports = function(scriptPath){
        return {
            run: function(){
                return new Promise(function(resolve, reject){

                    dbConnect(function(err, connection){
                        if(err){
                            return reject(err);
                        }

                        var script = require(scriptPath);
                        script(connection);

                        return resolve('Database dropped!');
                    });

                });
            }
        }
    };

})();