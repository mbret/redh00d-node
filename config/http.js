/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */
var passport = require( "passport" );
var fs = require('fs');

module.exports = {

    /****************************************************************************
     *                                                                           *
     * Express middleware to use for every Sails request. To add custom          *
     * middleware to the mix, add a function to the middleware config object and *
     * add its key to the "order" array. The $custom key is reserved for         *
     * backwards-compatibility with Sails v0.9.x apps that use the               *
     * `customMiddleware` config option.                                         *
     *                                                                           *
     ****************************************************************************/
    http: {
        middleware: {

            /***************************************************************************
             *                                                                          *
             * The order in which middleware should be run for HTTP request. (the Sails *
             * router is invoked by the "router" middleware below.)                     *
             *                                                                          *
             ***************************************************************************/
            order: [
                'startRequestTimer',
                'cookieParser',
                'session',
                'myRequestLogger',
                'bodyParser',
                'handleBodyParserError',
                'compress',
                'methodOverride',
                'poweredBy',
                '$custom',
                'passportInit',
                'router',
                'www',
                'initTestSetDatabase', // @todo remove for production
                'favicon',
                '404',
                '500'
            ],

            initTestSetDatabase: function(req, res, next){
                // Create roles
                Role.create({ name: 'admin', displayName: 'Administrator' }).done(function(err, role){
                    if(err) next(err);
                    Role.create({ name: 'user', displayName: 'User' }).done(function(err, role){
                        if(err) next(err);

                        // Create users
                        User.create({email:'admin@admin.com', password: 'password'}).done(function(err, role){
                            if(err) next(err);
                            User.create({email:'user@user.com', password: 'password'}).done(function(err, role){
                                if(err) next(err);

                                next();
                            });
                        });
                    });
                });
            },

            // simple log of http request
            myRequestLogger: function (req, res, next) {
                sails.log.info(req.method, req.url);
                return next();
            },

            // Use passport
            passportInit: require('passport').initialize()

            /***************************************************************************
             *                                                                          *
             * The body parser that will handle incoming multipart HTTP requests. By    *
             * default as of v0.10, Sails uses                                          *
             * [skipper](http://github.com/balderdashy/skipper). See                    *
             * http://www.senchalabs.org/connect/multipart.html for other options.      *
             *                                                                          *
             ***************************************************************************/
            // bodyParser: require('skipper')

        },


        /***************************************************************************
         *                                                                          *
         * The number of seconds to cache flat files on disk being served by        *
         * Express static middleware (by default, these files are in `.tmp/public`) *
         *                                                                          *
         * The HTTP static cache is only active in a 'production' environment,      *
         * since that's the only time Express will cache flat-files.                *
         *                                                                          *
         ***************************************************************************/
        cache: 31557600000
    }

};
