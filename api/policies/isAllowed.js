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

module.exports = function isAllowed(req, res, next) {

    var user = req.user;
    var controllerName = req.options.controller;
    var actionName = req.options.action;

    // get role
    UserRole.findOne({ID:user.roleID}).then(function(role){
        if(!role) throw new Error("Unable to load role");
        if( PermissionsService.isAllowed( role.name, controllerName, actionName ) ){
            return next();
        }
        else{
            return res.forbidden();
        }
    }).fail(function(err){
        return next(err);
    })

};