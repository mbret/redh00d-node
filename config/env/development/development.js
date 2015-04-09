/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
    models: {
        connection: 'localDiskDb',
        migrate: 'drop' // erase database before each launch
    },

    fillDb: true,

    general: {
        // Active protection of JSON returned data of each request
        protectJsonData: false,
        
        siteURL: 'https://localhost:1337',
        docURL: 'https://localhost:1337/doc'
        // docURL is not overwritten to keep protected link when deployed on server. If you want to use local doc, navigate inside api-docs folder.
    },

    policies: {
        DevController: {
            '*': true,
            'auth': ['isAllowedWithPolicies']
        },
        HelperController: {
            me: ['anyAuth'],
            ping: true,
            authJWT: ['jwtAuth'],
            authBasic: ['basicAuth']
        }
    },

    log: {
        level: 'info'
    },

    ssl: {
//       ca: require('fs').readFileSync(__dirname + './ssl/server.crt'),
       key: require('fs').readFileSync(__dirname + '/../../ssl/server.key'),
       cert: require('fs').readFileSync(__dirname + '/../../ssl/server.crt')
    }

};
