/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user.
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`.
 *                 The policy check simply if user is authenticated (with passport). In case of user is not logged then we give a chance
 *                 to user to be authenticated with basic strategy. Finally we reject user.
 * @docs        :: http://sailsjs.org/#!documentation/policies, https://github.com/jaredhanson/passport
 *
 */
var passport = require('passport');

module.exports = function(req, res, next) {

    // User is authenticated, proceed to controller
    // isAuthenticated is a function injected inside req by passport (https://github.com/jaredhanson/passport/blob/master/lib/http/request.js)
    if (req.isAuthenticated()) return next();

    // Try authenticating user with API key
    passport.authenticate( 'basic', { session: false }, function (err, user, info) {
        if (err) return res.serverError(err);

        if (!user) return res.send(401, { status: "Not authorized" });

        req.user = user;
        next();
    })(req, res, next);

};