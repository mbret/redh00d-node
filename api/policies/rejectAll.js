/*
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

module.exports = function rejectAll(req, res, next) {

    return res.forbidden();

};