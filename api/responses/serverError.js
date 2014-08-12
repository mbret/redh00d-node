/**
 * 500 (Server Error) Response
 *
 *
 *
 */
module.exports = function serverError (err) {

    sails.log.error("Server error: ", err); // log the error with full stack trace
    this.res.status(500);

    if(!err) err = {};
    // In case of err is not an error handled by main program we do not send anything to customer to avoid sensitive information
    if( !err.code || (err.code && !sails.config.general.errors.codes[err.code]) ){
        err = {};
    }

    return ResponseHandlerService.handleErrorSend( this.req, this.res, err, "serverError" );

};

