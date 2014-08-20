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
module.exports = function badRequest(error) {

    // Log error to console
    sails.log.info('Sending 400 ("Bad Request") response: \n', error);
    this.res.status(400);

    // send response
    return ResponseHandlerService.handleErrorSend( this.req, this.res, error, "badRequest" );

};

