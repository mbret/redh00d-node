/**
 * 401 (Unauthorized) Handler
 *
 * @description Mean that the server doesn't know who you are and you must be authenticated
 *
 *
 */

module.exports = function(data) {

    this.res.status(401);

    return ResponseHandlerService.handleErrorSend( this.req, this.res, data, "badAuthentication" );

};

