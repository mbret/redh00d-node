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
module.exports = function notFound (data, code, message) {

    this.res.status(404);

    var response = {
        code: code || 'E_NOT_FOUND',
        message: message || 'The resource cannot be found',
        data: data || {}
    };

    // send response
    return ResponseService.send( this.req, this.res, response );

};

