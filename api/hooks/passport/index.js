'use strict';

var path            = require('path');
var url             = require('url');
var jwt             = require('jsonwebtoken');
var passport        = require('passport');


/**
 * Created by mbret on 23/04/2015.
 */
module.exports = function (sails) {

    return {

        // Configuration here will be available inside sails.config.passport
        // But if the file exist in /config/passport it will override default configuration
        defaults: {
            passport: { }
        },

        configure: function(){

        },

        initialize: function (cb) {

            // Extend passport node module with our custom method
            require('./passport').extend(sails, passport);

            // Load passport providers on startup
            // Will add to passport.use() all the strategy
            loadStrategies(sails, sails.config.passport.strategies);

            return cb();
        },

        routes: {
            before: {
                '/*': function configurePassport (req, res, next) {
                    passport.initialize()(req, res, next);
                }
            }
        },

        /**
         * Issue a new token for authenticated later.
         * @param user
         */
        issueAccessToken: function (user){
            var secretKey = sails.config.passport.token.secret;
            return jwt.sign({user:user.id}, secretKey, {
                algorithm: sails.config.passport.token.options.algorithm || 'HS256',
                expiresInSeconds: sails.config.passport.token.options.expiresInSeconds || 60 * 24,
                audience: sails.config.passport.token.options.audience,
                subject: sails.config.passport.token.options.subject,
                issuer: sails.config.passport.token.options.issuer
            });
        }
    };
};


/**
 * Load all strategies defined in the Passport configuration
 *
 * Will use the passport.use( new Strategy ... ) for all registered strategies.
 *
 * For more information about each strategy refer to their website
 *
 * For more information on the providers supported by Passport.js, check out:
 * http://passportjs.org/guide/providers/
 *
 */
function loadStrategies(sails, strategies) {

    Object.keys(strategies).forEach(function (key) {
        var options = { passReqToCallback: true };
        var Strategy;

        // Local strategy
        if (key === 'local') {
            _.extend(options, strategies[key].options);

            Strategy = strategies[key].strategy;

            passport.use(new Strategy(options, passport.protocols.local));
        }
        // Fb, basic, etc
        else{
            var protocol = strategies[key].protocol; // auth protocol
            var callback = strategies[key].callback;

            if (!callback) {
                callback = path.join('auth', key, 'callback');
                //throw Error('No callback specified');
            }

            Strategy = strategies[key].strategy;

            var baseUrl = sails.getBaseurl();

            switch (protocol) {
                case 'oauth':
                case 'oauth2':
                    options.callbackURL = url.resolve(baseUrl, callback);
                    break;

                case 'openid':
                    options.returnURL = url.resolve(baseUrl, callback);
                    options.realm     = baseUrl;
                    options.profile   = true;
                    break;
            }

            // Merge the default options with any options defined in the config. All
            // defaults can be overridden, but I don't see a reason why you'd want to
            // do that.
            _.extend(options, strategies[key].options);

            passport.use(new Strategy(options, passport.protocols[protocol]));
        }
    });
}
