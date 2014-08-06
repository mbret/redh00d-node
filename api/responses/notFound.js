/**
 * 404 (Not Found) Handler
 *
 *
 * Usage:
 * return res.notFound()
 * return res.notFound( 'This user is not available' )
 * return res.notFound( 'This user is not available',  { additional data } )
 *
 * Exemple of badRequest response:
 *
 *  {
 *      message: 'This user is not available',
 *      ... optional data ...
 *  }
 *
 *
 * NOTE:
 * If a request doesn't match any explicit routes (i.e. `config/routes.js`)
 * or route blueprints (i.e. "shadow routes", Sails will call `res.notFound()`
 * automatically.
 *
 */

module.exports = function notFound (errorCode, message, data) {

    sails.log.debug('Sending 404 ("Not Found") response: \n', errorCode, data);

    if(! errorCode || errorCode === null){
        errorCode = sails.config.general.errors.codes.resourceNotFound;
    }

    if( !data ) data = {};
    if( ! message ) data.message = this.res.__( errorCode.message );
    else{ data.message = message }

    data.errors = {
        code: errorCode.label
    };

    // Set status code
    this.res.status(404);


    // send response
    return ResponseHelper.helper.handleSend( this.req, this.res, data );
};

