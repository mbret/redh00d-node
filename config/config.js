/**
 * Created by Maxime on 19/07/2014.
 *
 * General config file used by application.
 * To retrieve this values just use sails.config.all.foo
 */

module.exports = {

    version: '0.0.1 (September 01, 2014)',

    database: {

        //initOnStartup: false
    },

    all: {
        // Error codes for api response
        errors: {
            codes: {
                badRequest: "Bad request",
                notFound:   "Not found",
                resourceNotFound: "Resource not found",
                modelNotFound: "Model not found",
                pageNotFound: "Page not found",
                dbUnavailable: "Database unavailable",
                accessForbidden: "Access forbidden",
                emailArleadyTaken: "Email already taken",
                badAuthentication: "Bad authentication",
                serverError: "Server error"
                // ...
            }
        },
    }
};
