/**
 * isAllowed
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user.
 *                 This policies check if the authentication by BasicAuth is ok. If user is authenticated then the user is placed inside req.user
 *                 Check Passport for more info about BasicAuth.
 * @docs        :: http://sailsjs.org/#!documentation/policies, https://github.com/jaredhanson/passport
 *
 */

var Q = require('q');

module.exports = function isAllowed(req, res, next) {

    // If request does not accept application/json then block request
    if( !req.wantsJSON ){
        return res.view('layout');
    }

    return next();

};