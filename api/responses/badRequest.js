/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest( 'Hey man your email is invalid' )
 * return res.badRequest( 'Hey man your email is invalid', { errors } )
 * return res.badRequest( 'hey man your email is invalid', { errors } , { additional data } );
 *
 * Exemple of badRequest response:
 *
 *  {
 *      message: 'A message which says more or less why bad request',
 *      errors: {
 *                  errors ...
 *              },
 *      ... optional data ...
 *  }
 *
 */
module.exports = function badRequest(message, errors, data) {

    // Log error to console
    this.req._sails.log.debug('Sending 400 ("Bad Request") response: \n',message, errors, data);

    // init
    var defaultMessage = this.res.__('Bad request');
    this.res.status(400);
    if( !data ) data = {};
    if( message ) data.message = message;
    else data.message = defaultMessage;
    data.errors = errors;

    // send response
    return ResponseHelper.helper.handleSend( this.req, this.res, data );

};

