'use strict';

var passport = require('passport');
var validator = require('validator');
var Facebook = require('machinepack-facebook');

/**
 * Create a token and attach it to the given user.
 * @param user
 * @returns {*|Progress}
 */
function issueToken(user){
    // Load passport and create new access token
    var query = {
        protocol : 'local',
        user     : user.ID
    };
    var token = passport.issueAccessToken(user);
    return UserPassport.update(query, { accessToken: token });
}

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

            // Create and attach token
            issueToken(user)
                .then(function(userPassword){
                    return res.ok({ access_token: userPassword[0].accessToken});
                })
                .catch(function(err){
                    return res.serverError(err);
                });
        })(req, res, next);
    },

    /**
     *
     * @param req
     * @param res
     * @returns {*}
     */
    register: function(req, res){
        var email = req.param('email');
        var password = req.param('password');

        // Email
        if( !validator.isEmail(email) ){
            return res.badRequest('Email.Invalid');
        }

        // Password must have at least 3 char
        if ( !validator.isLength(password, 3)) {
            return res.badRequest('Password.Too.Short');
        }

        var data = {
            email: email
        };

        // Create the user and init everything necessary for application
        User.create(data)
            .then(function(user){
                
                // Create passport
                var passportData = {
                    protocol : 'local',
                    password : password,
                    user     : user.ID
                };
                
                return UserPassport.create(passportData)
                    .then(function(userPassport){
                        
                        // Create and attach token
                        return issueToken(user)
                            .then(function(userPassword){
                                return res.created({ user: user.toCustomer(), access_token: userPassword[0].accessToken});
                            });
                    })
                    .catch(function(err){
                        // It could be invalid password here but we check before with validator
                        return user.destroy()
                            .then(function(){
                                throw err;
                            });
                    });
            })
            .catch(function(err){
                console.log(err);
                if (err.code === 'E_VALIDATION') {
                    if (err.invalidAttributes.email) {
                        // This error could be something else but as we validate before we should only get an error because emeail already taken here
                        return res.badRequest('Email already taken');
                    } else {
                        return send( 'This user exist' );
                    }
                }
                return res.serverError(err);
            });
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

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    facebookCallback: function(req, res, next){
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        })(req, res, function(err, user){
            if(err){
                return res.serverError(err);
            }
            return res.ok(user);
        });
    }
};




