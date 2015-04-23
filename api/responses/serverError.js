/**
 * 500 (Server Error) Response
 *
 *
 *
 */
module.exports = function serverError (data, code, message) {

    this.res.status(500);

    var response = {
        code: code || 'E_SERVER_ERROR',
        message: message || 'Server error',
        data: data || {}
    };

    return ResponseService.sendError( this.req, this.res, response );

};

