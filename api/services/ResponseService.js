/**
 * This helper is useful to deal with response and get some useful method about.
 *
 * @type {{send: send}}
 */
module.exports = {

    /**
     *
     * @param req
     * @param res
     * @param data
     * @returns {*}
     */
    sendError: function(req, res, data){

        req._sails.log.error('Sent ' + res.statusCode + ' response\n', data);

        data = this._prepareData(req, res, data);

        // Only include errors in response if application environment
        // is not set to 'production'.  In production, we shouldn't
        // send back any identifying information about errors.
        if (sails.config.environment === 'production') {
            data = undefined;
        }

        // Always send json / xml
        return res.jsonx( data );
    },

    /**
     * This method handle response sending. Use it whenever you want to send something.
     *
     * @param req
     * @param res
     * @param data
     * @returns {*}
     */
    send: function(req, res, data){

        req._sails.log.info('Sent ' + res.statusCode + ' response\n', data);

        data = this._prepareData(req, res, data);

        // Always send json / xml
        return res.jsonx( data );
    },

    _prepareData: function(req, res, data){
        if(!data){
            data = {};
        }

        // Check response before all send
        if(!this._checkValidity(res)){
            throw new Error('Invalid response provided');
        }

        this._attachCommonHeaderInfo(req, res);
        return data;
    },

    _attachCommonHeaderInfo: function(req, res){

        res.set({
            'X-redh00d-api-version': sails.config.apiVersion,
            'X-redh00d-response-status': res.statusCode
        });

        // add debug dump
        if( sails.config.environment !== 'production' ){
            res.set({
                'X-redh00d-information': "More development information are available at /dev route",
                'X-redh00d-request-local': res.locale,
                'X-redh00d-request-api-internal-host': req.host,
                'X-redh00d-request-api-internal-port': req.port,
                'X-redh00d-request-api-internal-ip': req.ip,
                'X-redh00d-request-connection-secure': req.secure,
                'X-redh00d-request-ajax': req.xhr
            });


        }
    },

    _checkValidity: function(res){
        return true;
    }


};

// `sails` is not available out here
// (it doesn't exist yet)