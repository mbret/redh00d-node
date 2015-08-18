/**
 * 500 (Server Error) Response
 *
 *
 *
 */
module.exports = function serverError (data, code, message) {

    this.res.status(500);

    // Log error to console
    if (data !== undefined) {
        sails.log.error('Sending 500 ("Server Error") response: \n',data);
    }
    else{
        sails.log.error('Sending empty 500 ("Server Error") response');
    }

    var response = {
        code: code || 'E_SERVER_ERROR',
        message: message || 'Server error',
        data: data || {}
    };

    return ResponseService.sendError( this.req, this.res, response );

};

