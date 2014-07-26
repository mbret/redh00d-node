/**
 * preventApiKeyUpdate
 *
 * @module      :: Policy
 * @description :: Simple policy to prevent user's from changing their API keys. The request field is deleted
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

    if( req.params.api_key ){
        delete params.api_key;
    }

    next();

};