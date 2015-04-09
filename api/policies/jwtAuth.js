/**
 * Implement a policy based on jwt authentication
 * @param req
 * @param res
 * @param next
 */
function jwtAuth(req, res, next) {

    sails.log.info('jwtAuth -> authentication asked');
    passport.authenticate('jwt', { session: false }, function (err, user, info){
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

}

module.exports = jwtAuth;