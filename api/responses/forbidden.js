/**
 * 403 (Forbidden) Handler
 *
 */

module.exports = function forbidden (message, data) {

    this.res.status(403);

    return ResponseService.handleErrorSend( this.req, this.res, data, "accessForbidden" );

};

