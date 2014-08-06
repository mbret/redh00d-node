/**
 * DebugController
 *
 * @description :: Server-side logic for managing Debugs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Promise = require("bluebird");
var async = require("async");
var Q = require("q");

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
        Q().then(function () {
            //Load some data in parallel
            return Q.all([
                UserRole.find(),
                Event.find()

            ]).spread(function (roles, events) {
                data.roles = roles;
                data.events = events;

            });

        }).then(function () {
            // load users and their roles
            return User.find().then(function (users) {
                // for each users load roles
                var promises = [];
                for( var i in users ){
                    promises.push(users[i].loadRole());
                }
                return Q.all(promises).then(function(){
                    data.users = users;
                })
            });

        }).then(function () {
            return res.ok(data);

        }).fail(function (err) {
            return res.serverError(err);
        });

    }

}

