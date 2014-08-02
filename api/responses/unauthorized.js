/**
 * 401 (Unauthorized) Handler
 *
 * @description Mean that the server doesn't know who you are and you must be authenticated
 *
 * Usage:
 * return res.unauthorized( 'Your are not allowed ...' )
 * return res.unauthorized( 'Your are not allowed ...', { additional data } );
 *
 * Exemple of Unauthorized response:
 *
 *  {
 *      message: 'Your are not allowed ...',
 *      status: 401,
 *      ... optional data ...
 *  }
 */

module.exports = function forbidden (message, data) {

    sails.log.debug('Sending 401 ("Unauthorized") response: \n',message, data);

    // init
    var defaultMessage = this.res.__('Authentication error');
    this.res.status(401);
    if( !data ) data = {};
    if( message ) data.message = message;
    else data.message = defaultMessage;

    // send response
    return ResponseHelper.helper.handleSend( this.req, this.res, data );

};

