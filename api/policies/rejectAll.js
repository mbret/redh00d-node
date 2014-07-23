

module.exports = function(req, res, next) {

    return res.forbidden( res.i18n("You cannot access this resource") );

};