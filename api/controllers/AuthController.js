'use strict';

var passport = require('passport');
var jwt = require('jsonwebtoken');

module.exports = {

    /**
     * Signin with local account
     * @param req
     * @param res
     */
    login: function(req, res, next){
        passport.authenticate('local', function(err, user, info){
            if (err){
                return res.serverError(err);
            }
            if(!user){
                return res.badRequest(info.message);
            }
            
            // Load passport and create new access token
            var query = {
                protocol : 'local',
                user     : user.ID
            };
            var token = passport.issueAccessToken(user);
            UserPassport.update(query, { accessToken: token })
                .then(function(userPassword){
                    return res.ok({ access_token: userPassword[0].accessToken});
                })
                .catch(function(err){
                    return res.serverError(err);
                });
        })(req, res, next);
    },
    
    /**
     * Redirect the user to the provider for authentication. When complete,
     * the provider will redirect the user back to the application at /auth/:provider/callback
     * @param req
     * @param res
     */
    facebook: function(req, res){

        var options = {};
        
        var strategy = sails.config.passport.strategies['facebook'];
        
        // Attach scope if it has been set in the config
        if (strategy.hasOwnProperty('scope')) {
            options.scope = strategy.scope;
        }

        // Sessions are not typically needed by APIs, so they can be disabled.
        options.session = false;

        passport.authenticate('facebook', options)(req, res);
    },

    facebookCallback: function(req, res){
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        });
    }
};




