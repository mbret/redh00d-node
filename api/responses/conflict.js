
module.exports = function notFound (data, code, message) {

    this.res.status(409);

    var response = {
        code: code || 'E_BAD_REQUEST',
        message: message || 'The request cannot be fulfilled due to bad syntax',
        data: data || {}
    };

    this.req._sails.log.info('Sent 409 response\n', error);

    return ResponseService.send( this.req, this.res, response );

};

