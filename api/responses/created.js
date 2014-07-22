/**
 * 201 (CREATED) Response
 *
 * Usage:
 * return res.created()
 * return res.created( { user: user } )
 *
 * Exemple of created response:
 *
 *  {
 *      myObjectCreated: { content, resume },
 *      status: 201,
 *  }
 */

module.exports = function sendOK (data) {

    sails.log.debug('res.ok() :: Sending 201 ("OK") response');

    // Set status code
    this.res.status(201);

    // send response
    return ResponseHelper.helper.handleSend( this.req, this.res, data );

};
