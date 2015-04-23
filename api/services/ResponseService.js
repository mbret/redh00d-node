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

        req._sails.log.error('Sent ' + req.statusCode + ' response\n', data);

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

        req._sails.log.info('Sent ' + req.statusCode + ' response\n', data);

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

        return this._attachCommonData(req, res, data);
    },

    _attachCommonData: function(req, res, data){

        if(!data.status) data.status = res.statusCode ;

        data.api_version = sails.config.apiVersion;

        // add debug dump
        if( sails.config.environment !== 'production' ){
            data.debug = {
                information: "More development information are available at /dev route",
                request: {
                    locale: res.locale,
                    api_internal_host: req.host,
                    api_internal_port: req.port,
                    api_internal_ip: req.ip,
                    connection_secure: req.secure,
                    ajax: req.xhr
                },
                response: {
                    status: res.statusCode
                }
            }
        }

        return data;
    },

    _checkValidity: function(res){
        return true;
    }


};

// `sails` is not available out here
// (it doesn't exist yet)