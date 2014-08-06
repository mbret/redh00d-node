/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://links.sailsjs.org/docs/config/bootstrap
 */

var Promise = require("bluebird");
var async = require("async");
var Q = require("q");

module.exports.bootstrap = function(cb) {

    /**
     * Run all bootstrap task in series
     */
    async.series({

        /**
         * Init database
         * @returns {*}
         * @private
         */
        initDatabase: function _initDatabase(){
            if(sails.config.general.initDatabase) {

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
                    return cb(null, 'task1');

                }).fail(function (err) {
                    return cb(err);
                });

            }
            else{
                return cb();
            }
        },

        /**
         * Other stuff
         * @param cb
         */
        otherStuff: function(cb){
            // ...
        }

    }), function(err){
        if (err) return cb(err);
        return cb();
    };


};
