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
            if(sails.config.initDatabase) {
                async.series({

                    /*
                     * Init roles (using Q promises inside waterline)
                     * They are run synchronously
                     */
                    initRoles: function (cb) {

                        UserRole.create({ name: 'admin', displayName: 'Administrator', ID: 0 }).then(function (role) {
                            var roles = [role];
                            var newRole = UserRole.create({ name: 'user', displayName: 'User', ID: 1 }).then(function (role) {
                                return role;
                            })
                            roles.push(newRole);
                            return roles;
                        }).spread(function (role1, role2) {
                            console.log(role1);
                            console.log(role2);

                        }).then(function(){
                            return cb(null, 'task1');

                        }).fail(function (err) {
                            return cb(err);
                        });
                    },

                    /*
                     * Init users (using Q library)
                     * They are run asynchronously
                     */
                    initUsers: function (cb) {
                        Q.all([
                            User.create({email: 'admin@admin.com', password: 'password'}),
                            User.create({email: 'user@user.com', password: 'password'})
                        ]).spread(function () {
                            return cb(null, 'task2');
                        }).catch(function (err) {
                            return cb(err);
                        }).done(function () {
                            // clean up
                        });
                    }

                }, function (err) {
                    if (err) return cb(err);
                    return cb();
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
