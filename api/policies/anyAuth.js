
// Get policies functions
var basicAuth = require(__dirname + '/basicAuth.js');
var jwtAuth = require(__dirname + '/jwtAuth.js');

/**
 * This policy will check for every available authentication method.
 * It use and require others policies from application.
 * @param req
 * @param res
 * @param next
 */
function anyAuth(req, res, next) {

    //@todo use passport option in config to define how to recognize each type of auth
    // Check for basic auth
    var auth = req.headers.authorization;
    if (auth && auth.search('Basic ') > -1) {
        basicAuth(req, res, next);
    }
    // JWT auth
    else{
        jwtAuth(req, res, next);
    }

}

module.exports = anyAuth;