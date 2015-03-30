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

    // @todo create and init data/access.log if it doesnt exist
    // @todo create and init data/logs.log if it doesnt exist

    async.series([

        // Init database
        function(cb){

            if(sails.config.fillDb === true){
                switch(sails.config.environment){
                    case 'production':
                        DbService.init('production')
                            .then(function(){ cb(); })
                            .catch(cb);
                        break;
                    case 'development':
                        DbService.init('development')
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
        }
    ], function(error){
       return cb(error);
    });



};
