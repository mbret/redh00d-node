/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

    models: {
        connection: 'localDiskDb',
        migrate: 'drop'
    },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

    port: 1337,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

    log: {
        level: "info"
    },

    general: {
        initDatabase: true, // init database each lift with default data

        protectJsonData: false, // Active protection of JSON returned data of each request

        siteURL: 'https://api.reh00d.unreachable.me'
        // docURL is not overwritten to keep protected link when deployed on server. If you want to use local doc, navigate inside api-docs folder.
    },

    policies: {
        DevController: {
            '*': true,
            'auth': ['isAllowed']
        }
    },

    ssl: {
//       ca: require('fs').readFileSync(__dirname + './ssl/server.crt'),
        key: require('fs').readFileSync(__dirname + '/../ssl/server.key'),
        cert: require('fs').readFileSync(__dirname + '/../ssl/server.crt')
    }

};
