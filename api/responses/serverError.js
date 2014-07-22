/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return res.serverError()
 * return res.serverError( 'An internal error occurred')
 * return res.serverError( 'An internal error occurred', { errors } )
 * return res.serverError( 'An internal error occurred', { errors } , { additional data } );
 *
 * Exemple of serverError response:
 *
 *  {
 *      message: 'An internal error occurred',
 *      errors: {
 *                  errors ...
 *              },
 *      ... optional data ...
 *  }
 *
 */

module.exports = function serverError (message, errors, data) {

    sails.log.error('Sending 500 ("Server Error") response: \n',errors, data);

    // Set status code
    this.res.status(500);

    // init
    var defaultMessage = this.res.__('An internal error occurred');
    this.res.status(400);
    if( !data ) data = {};
    if( message ) data.message = message;
    else data.message = defaultMessage;
    data.errors = errors;

    // send response
    return ResponseHelper.helper.handleSend( this.req, this.res, data );

};

