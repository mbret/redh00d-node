/**
 * isGuest
 */

module.exports = function(req, res, next) {

    return req.user.isGuest ? next() : res.forbidden();

};