/**
 * DebugController
 *
 * @description :: Server-side logic for managing Debugs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Promise = require("bluebird");
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
//                var promises = [];
//                for( var i in users ){
//                    promises.push(users[i].loadRole());
//                }
//                return Q.all(promises).then(function(){
                    data.users = users;
//                })
            });

        }).then(function () {
            return res.ok(data);

        }).fail(function (err) {
            return res.serverError(err);
        });

    },

    /**
     * Init database with test set values
     * @param req
     * @param res
     */
    initDatabase: function(req, res){
        Q().then(function(){

            /*
             * Init roles (using Q promises)
             * They are run in parallel
             */
            return Q.all([
                UserRole.create({ name: 'admin', displayName: 'Administrator', ID: 0 }),
                UserRole.create({ name: 'user', displayName: 'User', ID: 1 })
            ]);

        }).then(function(){

            /*
             * Init users (using Q library)
             * They are run in parallel
             */
            return Q.all([
                User.create({email: 'admin@admin.com', password: 'password'}),
                User.create({email: 'user@user.com', password: 'password'})
            ]);

        }).then(function() {

            /*
             * Init events
             */
            return Q.all([
                Event.create({name:'Soirée pyjama', description:'Venez tous nue', userID: 2, place: 'Toul', date: '2014-12-31'}),
                Event.create({name:'Meeting redh00d', description:'On va fumer de la bonne grosse beu !!', userID: 2, place: 'Coloc', date: '2014-12-01'})
            ]);

        }).then(function() {
            return res.created();

        }).fail(function (err) {
            return res.serverError(err);
        });
    }

}

