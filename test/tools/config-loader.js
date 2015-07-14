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
    module.exports = function(configPath){
        var config = {};
        var files = fs.readdirSync(configPath);
        files.forEach(function(filePath){
            if(filePath.substring(filePath.length-2, filePath.length) === 'js'){
                var file = require(path.join(configPath, filePath));
                config = _.merge(config, file);
            }
        });
        return config;
    };
})();