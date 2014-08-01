/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://links.sailsjs.org/docs/config/http
 */
var passport = require( "passport" );
var fs = require('fs');

module.exports = {


    http: {
        middleware: {

            // The order in which middleware should be run for HTTP request.
            // (the Sails router is invoked by the "router" middleware below.)
            order: [
                'startRequestTimer',
                'cookieParser',
                'session',
                'bodyParser',
                'handleBodyParserError',
                'compress',
                'methodOverride',
                'poweredBy',
                '$custom',
                'router',
                'www',
                'favicon',
                '404',
                '500'
            ]

            // The body parser that will handle incoming multipart HTTP requests.
            // By default as of v0.10, Sails uses [skipper](http://github.com/balderdashy/skipper).
            // See http://www.senchalabs.org/connect/multipart.html for other options.
            // bodyParser: require('skipper')

        },

        // Custom express middleware function to use
        // Here is the part where we can inject custom middleware
        customMiddleware: function(app){
            sails.log.debug('Custom middleware injection...');

            sails.log.debug('Passport middleware injected');
            app.use(passport.initialize()); // passport middleware initialized now
            app.use(passport.session()); // uses persistent login sessions
        },

        // Configures the middleware function used for parsing the HTTP request body
        // Defaults to the Formidable-based version built into Express/Connect
        //
        // To enable streaming file uploads (to disk or somewhere else)
        // you'll want to set this option to `false` to disable the body parser.
        //
        // Alternatively, if you're comfortable with the bleeding edge,
        // check out: https://github.com/balderdashy/skipper
//    bodyParser: undefined,

        // Cookie parser middleware to use
        //      (or false to disable)
        //
        // Defaults to `express.cookieParser`
        //
        // Example override:
        // cookieParser: (function cookieParser (req, res, next) {})(),
//    cookieParser: express.cookieParser,

        // HTTP method override middleware
        //      (or false to disable)
        //
        // This option allows artificial query params to be passed to trick
        // Express into thinking a different HTTP verb was used.
        // Useful when supporting an API for user-agents which don't allow
        // PUT or DELETE requests
        //
        // Defaults to `express.methodOverride`
        //
        // Example override:
        // methodOverride: (function customMethodOverride (req, res, next) {})()
//    methodOverride: express.methodOverride

        // Extra options to pass directly into the Express server
        // when it is instantiated
        //      (or false to disable)
        //
        // This is the options object for the `createServer` method, as discussed here:
        // http://nodejs.org/docs/v0.10.20/api/https.html#https_class_https_server
        serverOptions: undefined,

        // The number of seconds to cache flat files on disk being served by
        // Express static middleware (by default, these files are in `.tmp/public`)
        //
        // The HTTP static cache is only active in a 'production' environment,
        // since that's the only time Express will cache flat-files.
        cache: 31557600000
    }

};
