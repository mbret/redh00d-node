(function(){
    'use strict';

    var path = require('path');
    var _ = require('lodash');
    var fs = require('fs');

    /**
     * Load dynamically config files following sails behaviour.
     * This function can be used to load testing config files. It will load every files present inside directory.
     *
     * @param string path Path for the testing configuration. Ex: /root/config/env/testing
     */
    module.exports = function(configPath, env){
        return _loadConfig(configPath);
    };

    /**
     * Load dynamically config files following sails behaviour.
     * This function can be used to load testing config files. It will load every files present inside directory.
     *
     * @param string path Path for the testing configuration. Ex: /root/config/env/testing
     */
    function _loadConfig(configPath){

        // try to load one file
        if(path.extname(configPath) === '.js'){
            return require(configPath);
        }
        // try to load config folder
        else{
            var config = {};
            var files = fs.readdirSync(configPath);
            files = files.filter(function(entry){
                return path.extname(entry) === '.js';
            });
            files.forEach(function(filePath){
                var file = require(path.join(configPath, filePath));
                config = _.merge(config, file);
            });

            // load specific env config
            return config;
        }
    }
})();