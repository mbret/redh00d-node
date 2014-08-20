
module.exports = function notFound (error) {

    this.res.status(409);

    return ResponseHandlerService.handleErrorSend( this.req, this.res, error, "conflict" );

};

