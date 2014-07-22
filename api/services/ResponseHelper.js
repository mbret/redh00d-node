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
            data._debug = {
                api_version: sails.config.general.apiVersion,
                locale: res.locale,
                region: res.region,
                session: req.session,
                sessionID: req.sessionID,
                sessionStore: req.sessionStore,
                signedCookies: req.signedCookies
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