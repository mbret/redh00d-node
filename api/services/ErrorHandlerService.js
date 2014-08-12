/**
 * Allow programmer to use handleError(err) instead of treat each kind of error.
 * This service is generic and sometimes a more fine error management is required.
 */
module.exports = {

    handleError: function( err, res ) {

        console.log(err.error);
        console.log(err.code);
        return res.jsonx( err );

        if ( err.code == "E_VALIDATION" ) {
            return res.badRequest(err);
        }
        else {
            return res.serverError(err);
        }

    }


};