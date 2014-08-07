/**
 * 500 (Server Error) Response
 *
 *
 *
 */

module.exports = function serverError (err, data) {

    sails.log.error("Server error: ", err);
    this.res.status(500);

    return ResponseHelper.helper.handleErrorResponse( this.req, this.res, data, sails.config.general.errors.codes.serverError );

};

