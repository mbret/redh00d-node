/**
 * Simply check if user is authenticated
 * if not revoke access.
 */
module.exports = function (req, res, next) {

    if( req.user && req.user.authenticated === true){
        return next();
    }

    return res.unauthorized();
};