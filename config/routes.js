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
    '*': function preDispatch(req, res, next) {
        // simple log of http request
        sails.log.info(req.method, req.url);

        // If request does not accept application/json then block request
        if( !req.wantsJSON ){
            return res.view('layout');
        }

        return next();
    },

    // Debug route
    'get /api/debug/db': 'DebugController.dumpDatabase',


    /**
     * EVENT relatives routes
     */
    // only events
    'get    /api/events/:id':                   'EventController.find',
    'post   /api/events':                       'EventController.create',
    'delete /api/events/:id':                   'EventController.destroy',
    'put    /api/events/:id':                   'EventController.update',
    // users from events
    'get    /api/events/:eventid/users':        'UserController.findMultipleByEvent',
    'get    /api/events/:eventid/users/:id':    'UserController.findUserByEvent',

    'get    /api/events*':                      'EventController.findMultiple',

    /**
     * AUTHENTICATION relatives routes
     */
    'post   /api/auth':                         'AuthController.login',
    'delete /api/auth':                         'AuthController.logout',

    /**
     * USER relatives routes
     */
    // only users
    'get   /api/users/:id':                     'UserController.find',
    'post  /api/users':                         'UserController.create',
    // events from users
    'get   /api/users/:userid/events':          'EventController.findMultipleByUser',
    'get   /api/users*':                        'UserController.findMultiple'


    //get an user by email
//    "get /api/users/:email": 'UserController.findByEmail',
   
 
    // ask for new password (required: email)
    //'post /api/users/password-reset' : { controller: 'UserController', action: 'createPasswordReset' },

    // update password (required: user id, reset token)
    //'put /api/users/password-reset/:id?' : { controller: 'UserController', action: 'updatePassword' }

    // If a request to a URL doesn't match any of the custom routes above,
    // it is matched against Sails route blueprints.  See `config/blueprints.js`
    // for configuration options and examples.

};
