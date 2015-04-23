/**
 * 401 (Unauthorized) Handler
 *
 * @description Mean that the server doesn't know who you are and you must be authenticated
 *
 *
 */

module.exports = function(data, code, message) {

    this.res.status(401);

    var response = {
        code: code || 'E_UNAUTHORIZED',
        message: message || 'Not authorized',
        data: data || {}
    };

    return ResponseService.send( this.req, this.res, response );

};

