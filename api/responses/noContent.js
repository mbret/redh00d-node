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

module.exports = function noContent () {

    sails.log.debug('res.noContent() :: Sending 204 ("NO CONTENT") response');

    // Set status code
    this.res.status(204);
    data = {};

    // send response
    return ResponseService.handleSend( this.req, this.res, data );

};
