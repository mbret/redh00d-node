'use strict';

var path = require('path');

/**
 * Passport configuration
 *
 * This if the configuration for your Passport.js setup and it where you'd
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */
module.exports.passport = {

    /***************************************************************************
     *                                                                          *
     * Token secret                                                             *
     *                                                                          *
     ***************************************************************************/
    token: {
        secret: 'cfb30a124904ef2bf7de83d7f85e4f51',
        options: {
            expiresInSeconds: 60 * 24, // Time interval in minutes when token will be expired or false if not expires
            audience: 'redh00d',
            subject: 'API redh00d',
            issuer: 'redh00d',
            algorithm: "HS256" // Algorithm that using for signing JWT
        }
    },

    strategies : {
        // https://github.com/ryanwebber/sails-authorization/blob/master/client/www/js/views.js
        local: {
            strategy: require('passport-local').Strategy,
            options: {
                // Since we need to allow users to login using both usernames as well as
                // emails, we'll set the username field to something more generic.
                usernameField: 'email',
                passwordField: 'password'
            }
        },

        basic: {
            strategy: require('passport-http').BasicStrategy,
            protocol: 'basic'
        },

        jwt: {
            strategy: require('passport-jwt').Strategy,
            protocol: 'jwt',
            options: {
                secretOrKey: 'cfb30a124904ef2bf7de83d7f85e4f51',
                audience: 'redh00d',
                issuer: 'redh00d',
                authScheme: 'JWT'
            }
        },

        facebook: {
            name: 'Facebook',
            protocol: 'oauth2',
            strategy: require('passport-facebook').Strategy,
            options: {
                clientID: '440811692744629',
                clientSecret: 'b97e0244dd4c44cff27faca23a2cf255'
            },
            scope: ['email', 'read_stream', 'publish_actions']
        }
    }
    
};
