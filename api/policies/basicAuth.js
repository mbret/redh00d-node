/**
 *
 *
 */

module.exports = function basicAuth(req, res, next) {

    sails.log.info('anyAuth -> basic authentication asked');
    passport.authenticate('basic', { session: false }, function (err, user, info){
        if (err) return next(err);

        if(!user){
            return res.unauthorized();
        }
        else{
            req.user = user;
            req.user.isAuthenticated = true;
            return next();
        }
    })(req, res, next);

};