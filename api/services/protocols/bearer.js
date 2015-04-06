var validator = require('validator');

/**
 *  
 * @param req
 * @param token
 * @param done
 */
module.exports = function(req, token, done) {

    if(!token){
        return next(null, false, {code:401});
    }
    
    var query = {
        protocol : 'local',
        accessToken   : token
    };

    UserPassport.findOne(query).populate('user')
        .then(function (entry) {
            if (!entry || !entry.user) {
                return done(null, false, {message: "Invalid.Token"});
            }
            
            // load role
            return UserRole.findOne(entry.user.role).then(function(role){
                entry.user.role = role;
                return done(null, entry.user, { scope: 'all' });
            });
        })
        .catch(done);
};
