/**
 * 403 (Forbidden) Handler
 *
 */

module.exports = function forbidden (message, data) {

    this.res.status(403);

    return ResponseHandlerService.handleErrorSend( this.req, this.res, data, "accessForbidden" );

};

