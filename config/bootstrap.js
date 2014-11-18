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
var fs = require('fs');

module.exports.bootstrap = function(cb) {

    // Check correct permissions settings for application
    checkPermissions(function(err){

        if(err) return cb(err);

        /**
         * Init database
         * and insert test data
         */
        if(sails.config.general.initDatabase){
            DatabaseService.seedDefaultData().then(function() {
                return DatabaseService.seedTestData().then(function(){
                    return cb();
                })
            }).catch(function (err) {
                return cb(err);

            });
        }
        else{
            return cb();
        }
    });



    function checkPermissions(cb){
        var permissionsCorrect = true;
        async.parallel([
            // Write
            function(callback){
                UtilsService.checkPermission( 'data', 'write', function(err, result){
                    if(!result){
                        permissionsCorrect = false;
                        sails.log.error('Unable to write in /data');
                    }
                    return callback(err);
                });
            },
            // Write .tmp
            function(callback){
                UtilsService.checkPermission( '.tmp', 'write', function(err, result){
                    if(!result){
                        permissionsCorrect = false;
                        sails.log.error('Unable to write in .tmp');
                    }
                    return callback(err);
                });
            }
        ],
        function(err){
            if(err) return cb(err);
            if(!permissionsCorrect){
                return cb(new Error('Permissions are not set correctly please review the permissions settings'));
            }
            return cb();
        });
    }

};
