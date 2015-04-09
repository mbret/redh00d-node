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

    // Set status code
    this.res.status(201);

    // send response
    return ResponseService.handleSend( this.req, this.res, data );

};
