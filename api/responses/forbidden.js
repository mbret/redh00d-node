/**
 * 403 (Forbidden) Handler
 *
 */

module.exports = function forbidden (message, data) {

    this.res.status(403);

    return ResponseHelper.helper.handleErrorResponse( this.req, this.res, data, sails.config.general.errors.codes.accessForbidden );

};

