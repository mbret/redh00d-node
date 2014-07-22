/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden( 'Your are not allowed ...' )
 * return res.forbidden( 'Your are not allowed ...', { additional data } );
 *
 * Exemple of forbidden response:
 *
 *  {
 *      message: 'Your are not allowed ...',
 *      status: 403,
 *      ... optional data ...
 *  }
 */

module.exports = function forbidden (message, data) {

    sails.log.debug('Sending 403 ("Forbidden") response: \n',message, data);

    // init
    var defaultMessage = this.res.__('Access denied');
    this.res.status(403);
    if( !data ) data = {};
    if( message ) data.message = message;
    else data.message = defaultMessage;

    // send response
    return ResponseHelper.helper.handleSend( this.req, this.res, data );

};

