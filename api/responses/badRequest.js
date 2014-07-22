/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * res.badRequest( 'Hey man your email is invalid' )
 * res.badRequest( 'Hey man your email is invalid', {} )
 * res.badRequest( 'hey man your email is invalid', {} , { additional data } );
 *
 * Exemple of badRequest response:
 *
 *  {
 *      message: 'A message which says more or less why bad request',
 *      errors: {
 *                  qsd
 *              },
 *      status: 400,
 *      ... optional data ...
 *  }
 *
 */
module.exports = function badRequest(message, errors, data) {

    var defaultMessage = "Bad Request";

    // Set status code
    this.res.status(400);

    // Formalize response
    data = API_helper.helper.buildBaseResponseData( data, this.req, this.res );
    if( !message ) message = defaultMessage;
    if( !errors ) errors = {};
    data.errors = errors;
    data.message = message;
    data.status = this.res.status;

    // Log error to console
    this.req._sails.log.debug('Sending 400 ("Bad Request") response: \n',data);

    // If the user-agent wants JSON, always respond with JSON
    if ( this.req.wantsJSON ) {
        return this.res.jsonx(data);
    }
    else{

        // Not implemented
        this.res.send(400);
    }

};

