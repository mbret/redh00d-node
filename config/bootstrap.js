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

module.exports.bootstrap = function(cb) {



    PermissionsService.setPermissions(sails.config.permissions);

    async.series([

        // Init database
        // Use current set env to run different database script
        function(cb){

            if(sails.config.database.initOnStartup === true){
                switch(sails.config.environment){
                    case 'production':
                    case 'development':
                        DatabaseService.init(sails.config.environment)
                            .then(function(){ cb(); })
                            .catch(cb);
                        break;
                    default:
                        cb();
                }
            }
            else{
                return cb();
            }
        },
        
        // test
        function(cb){
            cb();
        }

    ], function(error){
       return cb(error);
    });



};
