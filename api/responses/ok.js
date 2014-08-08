/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok()
 *
 * Exemple of ok response:
 *
 *  {
 *      myData: { content }
 *      status: 200,
 *  }
 */

module.exports = function sendOK (data) {

    sails.log.debug('res.ok() :: Sending 200 ("OK") response');

    // Set status code
    this.res.status(200);

    // send response
    return ResponseHelper.helper.handleSend( this.req, this.res, data );

};
