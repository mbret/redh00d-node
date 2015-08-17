(function(){
    'use strict';

    var path = require('path');
    var _ = require('lodash');
    var fs = require('fs');

    module.exports = {

        /**
         * Load the user config
         * @returns {*}
         */
        load: function (argv) {
            var configEnvPath = path.join(process.env.APP_ROOT_PATH, 'config/env', argv.env);
            var configPath = path.join(process.env.APP_ROOT_PATH, 'config');
            var globalConfig = _.merge(_loadConfig(configPath), _loadConfig(configEnvPath));
            return _prepareConfig(globalConfig, argv);
        },

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

            // Load basic config
            var files = fs.readdirSync(configPath);
            var basicFiles = files.filter(function(entry){
                return path.extname(entry) === '.js' && entry !== 'local.js';
            });
            basicFiles.forEach(function(filePath){
                var file = require(path.join(configPath, filePath));
                config = _.merge(config, file);
            });

            // Load local config
            // Local config always replace all other config
            try{
                var file = require(path.join(configPath, 'local.js'));
                config = _.merge(config, file);
            }
            catch(err){};

            return config;
        }
    }

    function _prepareConfig(rawConfig, argv){
        var config = {
            userConfig: rawConfig
        };
        if(!_.isUndefined(argv.c)){
            config.connection = argv.c;
        }
        return config;
    }

})();