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

    var user = req.user;
    var controllerName = req.options.controller;
    var actionName = req.options.action;

    if( PermissionsService.isAllowed( user.grade.name, controllerName, actionName ) ){
        return true;
    }
    else{
        return res.forbidden();
    }
};