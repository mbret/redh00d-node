/**
 * This helper is useful to deal with response and get some useful method about.
 *
 * @type {{handleSend: handleSend}}
 */
exports.helper = {


    /**
     * Handle error responses.
     * - log response
     * - affect the default error information if something is missing
     * - call normal response handler
     * @param req
     * @param res
     * @param data
     * @param defaultErrorCode
     * @returns {*}
     */
    handleErrorResponse: function(req, res, data, defaultErrorCode){
        if( !data ) data = {};

        if( !data.message ){
            if( data.code ){
                data.message = res.__( sails.config.general.errors[data.code].message );
            }
            else{
                data.message = res.__( defaultErrorCode.message );
            }
        }
        if( !data.code ) data.code = defaultErrorCode.label;

        sails.log.info('Sending ' + res.statusCode + ' response: \n', data);
        return this.handleSend(req, res, data);
    },

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
//        data.status = res.statusCode;

        // add debug dump
        if( sails.config.environment === 'development' ){
            var session = req.session;
//            session.ID = req.sessionID;
            data._debug = {
                api_version: sails.config.general.version,
                request: {
                    locale: res.locale,
                    host: req.host,
                    ip: req.ip,
                    connection_secure: req.secure,
                    ajax: req.xhr
                }
//                request_signed_cookies: req.signedCookies,
//                request_unsigned_cookies: req.cookies,
//                current_session: req.session,
//                sessionStore: req.sessionStore

            }
        }

        // If request does not accept application/json then display special page
        console.log(req.options);
        if( !req.wantsJSON ){
            return res.view('wronguse');
        }
        else{
            return res.jsonx( data );
        }

    }


};

// `sails` is not available out here
// (it doesn't exist yet)