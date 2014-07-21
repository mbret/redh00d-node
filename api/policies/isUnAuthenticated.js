/**
 * isUnAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy that only allow unauthenticated users.
 *
 * @docs        :: http://sailsjs.org/#!documentation/policies, https://github.com/jaredhanson/passport
 *
 */
var passport = require('passport');

module.exports = function(req, res, next) {

    if (req.isAuthenticated()) return res.badRequest('You should loggout to use this feature');

    next();

};