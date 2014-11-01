/**
 * DebugController
 *
 * @description :: Server-side logic for managing Debugs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Promise = require("bluebird");

module.exports = {

    /**
     * Display some info from database.
     * Use this method for debug only
     * @param req
     * @param res
     */
    dumpDatabase: function(req, res) {

        var data = {};
        if (req.user) {
            data.loggedUser = req.user;
        }

        /*
         * This is an example of how structure code when using promises
         * Some code is executed in parallel and other in sequential
         * Always use "return" for a promises otherwise values and error will not be catchable
         */
        Promise.resolve().then(function () {
            //Load some data in parallel
            return Promise.all([
                UserRole.find(),
                Event.find(),
                Product.find(),
                ProductCategory.find(),
                User.find()

            ]).spread(function (roles, events, products, productCategory, users) {
                data.roles = roles;
                data.events = events;
                data.products = products;
                data.product_category = productCategory;
                data.users = users;
            });

        }).then(function () {
            return res.ok(data);

        }).catch(function (err) {
            return res.serverError(err);
        });

    },

    /**
     * Remove all logs
     * @param req
     * @param res
     */
    deleteLogs: function(req, res){
        var fs = require('fs');
        var input = sails.config.appPath + '/data/logs.log';
        var input2 = sails.config.appPath + '/data/access.log';
        fs.truncate(input, 0, function () {
            fs.truncate(input2, 0, function () {
                return res.send(200, "removed");
            });
        });

    },

    accessLogs: function(req, res){

        var fs = require('fs');
        var logs = "";
        var input = fs.createReadStream(sails.config.appPath + '/data/access.log');

        FilesService.readLines(input, function (data) {
            logs = logs + data + "<br/>";
        }, function(){
            logs += '<div id="end" ></div>';
            res.set('Content-Type', 'text/html');
            return res.send(200, logs);
        })
    },


    /**
     * Display logs
     * @param req
     * @param res
     */
    logs: function(req, res){
        var fs = require('fs');
        var logs = "";
        var input = fs.createReadStream(sails.config.appPath + '/data/logs.log');

        FilesService.readLines(input, function (data) {
            logs = logs + data + "<br/>";
        }, function(){
            logs += '<div id="end" ></div>';
            res.set('Content-Type', 'text/html');
            return res.send(200, logs);
        })
    },


    /**
     * Auth action. Used to make the first auth call from app
     * If user is authenticated and allowed then he will arrive here. Otherwise he is rejected by policies
     * @param req
     * @param res
     * @returns {*}
     */
    auth: function(req, res){
        // If we arrive here, it means that account is allowed and is legal
        return res.ok();
    }


};




