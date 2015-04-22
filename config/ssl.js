/**
 * Created by mbret on 22/04/2015.
 */
module.exports.ssl = {

    // SSL configuration
    // http://www.cert-depot.com/
    // http://www.mobilefish.com/services/ssl_certificates/ssl_certificates.php
    //       ca: require('fs').readFileSync(__dirname + './ssl/server.crt'),
    key: require('fs').readFileSync(__dirname + '/ssl/server.key'),
    cert: require('fs').readFileSync(__dirname + '/ssl/server.crt')
};