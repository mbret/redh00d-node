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

    var controllerName = req.options.controller;
    var actionName = req.options.action;

    if( PermissionsService.isAllowed( req.user.role, controllerName, actionName ) ){
        return next();
    }
    else{
        return res.forbidden();
    }

};