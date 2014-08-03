/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user.
 *                 This policies check if the authentication by BasicAuth is ok. If user is authenticated then the user is placed inside req.user
 *                 Check Passport for more info about BasicAuth.
 * @docs        :: http://sailsjs.org/#!documentation/policies, https://github.com/jaredhanson/passport
 *
 */
var passport = require('passport');

module.exports = function(req, res, next) {

    // Try to authenticate user with basic auth (rest api)
    passport.authenticate( 'basic', { session: false }, function (err, user, info) {
        if (err) return res.serverError(err);

        // Authentication failed (bad params, no user)
        if (!user){
            return res.unauthorized( res.i18n("You must be authenticate") );
        }

        req.user = user;
        return next();

    })(req, res, next);


};