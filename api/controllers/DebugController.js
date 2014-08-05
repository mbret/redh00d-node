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
    dumpDatabase: function(req, res){

        var data = {};
        if( req.user ){
            data.loggedUser = req.user;
        }

        /*
         * Load data in parallel
         */
        Q.all([
            UserRole.find(),
            User.find(),
            Event.find()

        ]).spread(function(roles, users, events){
            data.roles = roles;
            data.users = users;
            data.events = events;
            return res.ok(data);

        }).fail(function(err){
            return res.serverError(err);
        })

    }

};

