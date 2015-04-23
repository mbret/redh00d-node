/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest( 'Hey man your email is invalid' )
 * return res.badRequest( 'Hey man your email is invalid', { errors } )
 * return res.badRequest( 'hey man your email is invalid', { errors } , { additional data } );
 *
 *
 */
module.exports = function badRequest(data, code, message) {

    this.res.status(400);
    
    var response = {
        code: code || 'E_BAD_REQUEST',
        message: message || 'The request cannot be fulfilled due to bad syntax',
        data: data || {}
    };
    
    // send response
    return ResponseService.send( this.req, this.res, response );

};

