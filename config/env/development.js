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

    general: {
        initDatabase: true,
        // Active protection of JSON returned data of each request
        protectJsonData: false
    },

    policies: {
        DevController: true
    },

    log: {
        level: 'info'
    },

    ssl: {
//       ca: require('fs').readFileSync(__dirname + './ssl/server.crt'),
       key: require('fs').readFileSync(__dirname + '/../ssl/server.key'),
       cert: require('fs').readFileSync(__dirname + '/../ssl/server.crt')
    }

};
