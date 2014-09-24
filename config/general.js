/**
 * Created by Maxime on 19/07/2014.
 *
 * General config file used by application.
 * To retrieve this values just use sails.config.general.foo
 */

module.exports.general = {

    creators: [
        "Maxime Bret",
        "Baptiste Mulot"
    ],

    defaultUserRoleName: 'user',

    initDatabase: false, // Set this variable to true to initialize default values in database each lift

    version: '0.0.1 (September 01, 2014)',

    siteURL: 'https://redh00d.dnsalias.com:1337',

    docURL: 'https://redh00d.dnsalias.com/redh00d-api-doc',

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

    mail: {
        smtp: {
            ssl: false,
//            port: 25, // 465
            host: 'smtp.free.fr',
            to: 'xmax54@gmail.com',
            prepend_subject: 'Happy Contact Form | ',
            user: 'bret.maxime@gmail.com',
            pass: '08031990google'
        },
        // Default sender name and address for transactional emails
        from: {
            noReply: {
                name: 'Redh00d no reply',
                email: 'bret.maxime@gmail.com'
            },
            contact: {
                name: 'Redh00d contact',
                email: 'bret.maxime@gmail.com'
            }
        }

    }

};
