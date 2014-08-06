/**
 * 401 (Unauthorized) Handler
 *
 * @description Mean that the server doesn't know who you are and you must be authenticated
 *
 *
 */

module.exports = function forbidden (code, data) {

    sails.log.debug('Sending 401 ("Unauthorized") response: \n',code, data);

    // init
    var defaultMessage = this.res.__('Bad authentication');
    var defaultDescription = this.res.__('Please use valid username/password');
    this.res.status(401);
    if( !data ) data = {};
    if( !data.message ) data.message = defaultMessage;
    if( !data.description ) data.description = defaultDescription;

    // send response
    return ResponseHelper.helper.handleSend( this.req, this.res, data );

};

