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

    api: {
        version: '0.0.1',

    },

    mail: {
        // Default sender name and address for transactional emails
        from: {
            name: 'Maxime',
            email: 'xmax54@gmail.com'
        }
    }

};