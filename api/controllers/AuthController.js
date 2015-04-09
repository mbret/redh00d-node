'use strict';

var validator = require('validator');
var Facebook = require('machinepack-facebook');

/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function _onPassportAuth(req, res, error, user, info) {
    if (error){
        return res.serverError(error);
    }
    if (!user) return res.badRequest(null, info.code, info.message);

    var token = passport.issueAccessToken(user);
    
    return res.ok({
        token: token,
        user: user
    });
}

module.exports = {

    /**
     * Signin with local account
     * @param req
     * @param res
     */
    login: function(req, res){
        passport.authenticate('local', _onPassportAuth.bind(this, req, res))(req, res);
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

        // Create the user and init everything necessary for application
        User.create({ email: email })
            .then(function(user){
                
                return UserPassport.create( {
                        protocol : 'local',
                        password : password,
                        user     : user.ID
                    })
                    .then(function(userPassport){
                        var token = passport.issueAccessToken(user);
                        return {
                            token: token,
                            user: user
                        };
                    })
                    .catch(function(err){
                        // It could be invalid password here but we check before with validator
                        return user.destroy()
                            .then(function(){
                                throw err;
                            });
                    });
            })
            .then(res.created)
            .catch(function(err){
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
     * Create a third-party authentication endpoint
     *
     * @param {Object} req
     * @param {Object} res
     */
    provider: function (req, res) {
        passport.endpoint(req, res);
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    facebookCallback: function(req, res){
        // The provider will redirect the user to this URL after approval. Finish
        // the authentication process by attempting to obtain an access token. If
        // access was granted, the user will be logged in. Otherwise, authentication
        // has failed.
        passport.authenticate('facebook', function (err, user, challenges, statuses) {
            // handle facebook error 
            var definitiveError = null;
            var info = {};
            if(err){
                if(err.type == 'OAuthException'){
                    info.code = 'OAuthException';
                    info.message = err.message;
                }
                else{
                    definitiveError = err;
                }
            }
            return _onPassportAuth(req, res, definitiveError, user, info);
        })(req, res, req.next);
    }
};




