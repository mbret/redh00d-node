/**
 * This helper is useful to deal with response and get some useful method about.
 *
 * @type {{handleSend: handleSend}}
 */
exports.helper = {


    /**
     * This method handle the response sending.
     *
     * @description :: Some extra information are injected inside data and the response is correctly send.
     *
     * @param req
     * @param res
     * @param data
     * @returns {*}
     */
    handleSend: function(req, res, data){

        if( ! data ) {
            data = {};
        }
        // add classic status
        data.status = res.statusCode;

        // add debug dump
        if( sails.config.environment === 'development' ){
            var session = req.session;
            session.ID = req.sessionID;
            data._debug = {
                api_version: sails.config.general.api.version,
                request_locale: res.locale,
                request_signed_cookies: req.signedCookies,
                request_unsigned_cookies: req.cookies,
                request_host: req.host,
                request_ip: req.ip,
                request_connection_secure: req.secure,
                request_ajax: req.xhr,
                current_session: req.session,
                sessionStore: req.sessionStore

            }
        }

        // If the user-agent wants JSON, always respond with JSON
        if ( req.wantsJSON ) {
            return res.jsonx( data );
        }
        else{

            // Not implemented
            return res.send(400);
        }
    }


};

// `sails` is not available out here
// (it doesn't exist yet)