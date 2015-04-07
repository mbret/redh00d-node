/**
 *
 *
 */

module.exports = function anyAuth(req, res, next) {

    var authenticate;
    
    // Callback for authenticate method
    var onResult = function (err, user, info){
        if (err) return next(err);

        if(!user){
            return res.unauthorized();
        }
        else{
            req.user = user;
            req.user.isAuthenticated = true;
            return next();
        }
    };
    
    // Check for basic auth
    var auth = req.headers.authorization;
    if (auth && auth.search('Basic ') > -1) {
        sails.log.info('anyAuth -> basic authentication asked');
        authenticate = passport.authenticate('basic', { session: false }, onResult);
    }
    // Bearer auth
    else{
        sails.log.info('anyAuth -> bearer authentication asked');
        authenticate = passport.authenticate( 'bearer', { session: false }, onResult);
    }

    authenticate(req, res, next);

};