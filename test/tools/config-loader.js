'use strict';

var _ = require('lodash');
var fs = require('fs');

/**
 * Load dynamically config files following sails behaviour.
 * This function can be used to load testing config files. It will load every files present inside directory.
 *
 * @param string path Path for the testing configuration. Ex: /root/config/env/testing
 */
module.exports = function(path){
    var config = {};
    var files = fs.readdirSync(path);
    files.forEach(function(filePath){
        var file = require(path + '/' + filePath);
        config = _.merge(config, file);
    });
    return config;
}