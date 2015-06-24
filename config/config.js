/**
 * Created by Maxime on 19/07/2014.
 *
 * General config file used by application.
 * To retrieve this values just use sails.config.all.foo
 */

module.exports = {

    apiVersion: '0.0.1 (September 01, 2014)',

    database: {

        //initOnStartup: false
    },

    errorCode: {
        E_EMAIL_ALREADY_TAKEN: 'E_EMAIL_ALREADY_TAKEN',
        E_EMAIL_INVALID: 'E_EMAIL_INVALID',
        E_EMAIL_DOES_NOT_BELONG_TO_SOMEONE: 'E_EMAIL_DOES_NOT_BELONG_TO_SOMEONE',
        E_PASSWORD_TOO_SHORT: 'E_PASSWORD_TOO_SHORT',
        E_PASSWORD_RESET_NO_PASSWORD_SET_YET: 'E_PASSWORD_RESET_NO_PASSWORD_SET_YET'
    },

    // @todo seems not used anymore, remove it
    //all: {
    //    // Error codes for api response
    //    errors: {
    //        codes: {
    //            badRequest: "Bad request",
    //            notFound:   "Not found",
    //            resourceNotFound: "Resource not found",
    //            modelNotFound: "Model not found",
    //            pageNotFound: "Page not found",
    //            dbUnavailable: "Database unavailable",
    //            accessForbidden: "Access forbidden",
    //            emailArleadyTaken: "Email already taken",
    //            badAuthentication: "Bad authentication",
    //            serverError: "Server error"
    //            // ...
    //        }
    //    },
    //}
};
