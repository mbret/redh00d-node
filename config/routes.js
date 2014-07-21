/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://links.sailsjs.org/docs/config/routes
 */

module.exports.routes = {

    // This path is used to do some stuff in any way before all controllers
    // We could have call a controller which implement function(req, res, next) and call at last next()
    // but due to short logic/code a function placed here is more practice.
    '/*': function(req, res, next) {
        // simple log of http request
        sails.log.info(req.method, req.url);
        next();
    },

    // Debug route
    'get /api/debug/db': 'DebugController.dumpDatabase',

    /**
     * API routes
     */
    apiPrefix: '/api',

    /**
     * EVENT relatives routes
     * Possible actions:
     *      - get one or multiple event
     *      - update, delete one event
     *      - get all user from an event
     */
    // Just one route possible with the primary key
    'get /api/events/:id': 'EventController.find',
    // Optional parameters are available to refine the search
    'get /api/events*': 'EventController.findMultiple',
    // Create
    'post /api/events': 'EventController.create',
    // Delete
    'delete /api/events/:id': 'EventController.destroy',
    // Update an event
    'put /api/events/:id': 'EventController.update',
    // get all users from an event
    'get /api/event/:id/users': 'EventController.findMultipleUsers',

    /**
     * AUTHENTICATION relatives routes
     */
    'post /api/auth/login': { controller: 'AuthController', action: 'login' },
    'post /api/auth/logout': { controller: 'AuthController', action: 'logout' },

    /**
     * USER relatives routes
     *
     */
    // Create new user
    "post /api/users": { controller: 'UserController', action: 'create' },

    // ask for new password (required: email)
    //'post /api/users/password-reset' : { controller: 'UserController', action: 'createPasswordReset' },

    // update password (required: user id, reset token)
    //'put /api/users/password-reset/:id?' : { controller: 'UserController', action: 'updatePassword' }

    // If a request to a URL doesn't match any of the custom routes above,
    // it is matched against Sails route blueprints.  See `config/blueprints.js`
    // for configuration options and examples.

};
