'use strict';

/**
 *  
 * @param req
 * @param token
 * @param done
 */
module.exports = function(req, jwt_payload, done) {

    console.log(jwt_payload);

    User.findOne({id: jwt_payload.id})
        .then(function (entry) {
            if (!entry) {
                return done(null, false, {message: "Invalid.Token"});
            }

            return next(null, user, {});
        })
        .catch(done);
};