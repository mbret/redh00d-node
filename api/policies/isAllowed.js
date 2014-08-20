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

    // They are already formatted from sails to match with permissions
    var resource = req.options.controller;
    var action = req.options.action;

    // test permission
    if( PermissionsService.isAllowed( req.user.role.name, resource, action ) ){
        return next();
    }
    else{
        // case of reject maybe user is not authenticate ?
        if( ! req.user.isAuthenticated ) return res.unauthorized
        else return res.forbidden();
    }


};