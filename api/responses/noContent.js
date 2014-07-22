/**
 * 204 (NO CONTENT) Response
 *
 * @description :: Use this status for DELETE
 *
 * Usage:
 * return res.noContent()
 *
 * Exemple of badRequest response:
 *
 *  {
 *      // empty
 *  }
 */

module.exports = function sendOK () {

    sails.log.debug('res.noContent() :: Sending 204 ("NO CONTENT") response');

    // Set status code
    this.res.status(204);

    // send response
    return ResponseHelper.helper.handleSend( this.req, this.res, data );

};
