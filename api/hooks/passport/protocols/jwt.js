'use strict';

/**
 *  
 * @param req
 * @param token
 * @param done
 */
module.exports = function(req, jwt_payload, done) {

    sails.log.info('jwt auth protocol -> jwt_payload: ', jwt_payload);
    
    User.findOne({id: jwt_payload.user}).populate('role')
        .then(function (entry) {
            if (!entry)  return done(null, false, {message: "Invalid.Token"});
            
            return done(null, entry, {});
        })
        .catch(done);
};