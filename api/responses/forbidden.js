/**
 * 403 (Forbidden) Handler
 *
 */

module.exports = function forbidden (data, code, message) {

    this.res.status(403);

    var response = {
        code: code || 'E_FORBIDDEN',
        message: message || 'Access forbidden',
        data: data || {}
    };

    this.req._sails.log.info('Sent 403 ("Access forbidden") response\n', response);

    // send response
    return ResponseService.handleSend( this.req, this.res, response );

};

