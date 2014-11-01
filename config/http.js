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
                'myRequestLogger', // custom
                'bodyParser',
                'handleBodyParserError',
                'compress',
                'methodOverride',
                'poweredBy',
                '$custom',
                'passportInit', // custom
                'authenticateUser', // custom
                'router',
                'www',
                'favicon',
                '404', // call res.notFound()
                '500' // call res.serverError
            ],

            /**
             * This function authenticate a user from his request each request time.
             * The user is guest or (one role of this application)
             */
            authenticateUser: function(req, res, next){
                // Try to authenticate user with basic auth (rest api)
                passport.authenticate( 'basic', { session: false }, function (err, user, info) {
                    if (err) return next(err);

                    if(!user){
                        // build a partial user model (some method are tested even when user is guest)
                        req.user = {
                            isAuthenticated: false, // important
                            isGuest: true, // important
                            isAdmin: function(){return false}, // important
                            role: {name: 'guest'}
                        };
                    }
                    else{
                        req.user = user;
                        req.user.isAuthenticated = true;
                        req.user.isGuest = false;
                    }
                    return next();

                })(req, res, next);
            },

            // simple log of http request
            // Only in console, nginx take control on production environment
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
