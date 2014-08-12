/**
 * 404 (Not Found) Handler
 *
 * NOTE:
 * If a request doesn't match any explicit routes (i.e. `config/routes.js`)
 * or route blueprints (i.e. "shadow routes", Sails will call `res.notFound()`
 * automatically.
 *
 * @param {object} data additional information
 */
module.exports = function notFound (data) {

    this.res.status(404);

    return ResponseHandlerService.handleErrorSend( this.req, this.res, data, "notFound" );

};

