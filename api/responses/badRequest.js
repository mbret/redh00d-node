/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 * return res.badRequest(data, 'some/specific/badRequest/view');
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
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
        return res.jsonx(data);
    }
    else{

        // Not implemented
        this.res.send(400);
    }

};

