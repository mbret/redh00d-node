
module.exports = function notFound (error) {

    this.res.status(409);

    return ResponseService.handleErrorSend( this.req, this.res, error, "conflict" );

};

