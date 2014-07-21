/**
 * preventApiKeyUpdate
 *
 * @module      :: Policy
 * @description :: Simple policy to prevent user's from changing their API keys. The request field is deleted
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

    if (req.body.apiKey)
        delete req.body.apiKey;

    next();

};