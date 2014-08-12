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
module.exports = function badRequest(message, errors) {

    // Log error to console
    sails.log.debug('Sending 400 ("Bad Request") response: \n');
    this.res.status(400);

    // send response
    return ResponseHandlerService.handleErrorSend( this.req, this.res, {}, "badRequest" );

};

