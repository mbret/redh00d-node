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
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    // This path is used to do some stuff in any way before all controllers
    // We could have call a controller which implement function(req, res, next) and call at last next()
    // but due to short logic/code a function placed here is more practice.
    // It's not possible to use middleware because before router we should have to hard check the request (no req.wantsJson available)
    // and after router all these routes has been checked !
    '*': function preDispatch(req, res, next) {
        return next();
    },

    'get /api/doc': function(req, res){
        return res.view('doc');
    },

    // Debug route
    'get  /api/dev/db': 'DevController.dumpDatabase',
    'get  /api/dev/logs':'DevController.logs',
    'get  /api/dev/delete-logs':'DevController.deleteLogs',

    /**
     * EVENT relatives routes
     */
    'get    /api/events/:id':                   'EventController.find',
    'get    /api/events/:id/members/:idmember': 'EventController.findMember',
    'post   /api/events':                       'EventController.create',
    'delete /api/events/:id':                   'EventController.delete',
    'delete /api/events/:id/members/:idmember': 'EventController.deleteMember',
    'put    /api/events/:id':                   'EventController.update',
    'get    /api/events/:id/members*':          'EventController.findMultipleMembers',
    'get    /events*':                      'EventController.findMultiple',

    /**
     * INVITATION relatives routes
     */
    'post    /api/events/:idevent/invitations':     'InvitationController.create',
    'get     /api/events/:idevent/invitations/:id': 'InvitationController.find',
    'put     /api/events/:idevents/invitations':    'InvitationController.update', // author can cancel / receiver can cancel, accept
    'delete  /api/events/:idevent/invitations/:id': 'InvitationController.delete', // put state on cancel
    'get     /api/events/:idevent/invitation*':     'InvitationController.findMultiple',

    /**
     * AUTHENTICATION relatives routes
     */
//    'post   /api/auth':                         'AuthController.login',
//    'delete /api/auth':                         'AuthController.logout',

    /**
     * USER relatives routes
     */
    // only users
    'get    /api/users/:id':                    'UserController.find',
    'post   /api/users':                        'UserController.create',
    'put    /api/users/:id':                    'UserController.update',
    'patch  /api/users/:id':                    'UserController.patch', // password reset token
    'delete /api/users/:id':                    'UserController.delete',
    'get    /api/users*':                       'UserController.findMultiple',

    // USER friendships relatives routes
    'get    /users/:userid/friendships/:id':            'UserFriendShipController.find',
    'get    /users/:userid/friends/:idfriend':          'UserFriendShipController.FindFriend',
    'delete /users/:userid/friends/:idfriend':          'UserFriendShipController.delete', // cancel a friendship request
    'put    /users/:userid/friendships/:id':            'UserFriendShipController.update', // update request (a response for friends)
    'get    /users/:userid/friendships*':               'UserFriendShipController.findMultiple',
    'post   /users/:userid/friends':                    'UserFriendShipController.create', // Create a friendship request
    'get    /users/:userid/friends*':                   'UserFriendShipController.FindFriends',

    // USER friends group relatives routes
    'get    /api/users/:iduser/friendsgroup/:id':                  'UserFriendsGroupController.find',
    'post   /api/users/:iduser/friendsgroup':                      'UserFriendsGroupController.create',
    'post   /api/users/:iduser/friendsgroup/:id/members':          'UserFriendsGroupController.addMember',
    'put    /api/users/:iduser/friendsgroup':                      'UserFriendsGroupController.update',
    'delete /api/users/:iduser/friendsgroup/:id':                  'UserFriendsGroupController.delete',
    'delete /api/users/:iduser/friendsgroup/:id/members/:idmember':'UserFriendsGroupController.deleteMember',
    'get    /api/users/:iduser/friendsgroup*':                     'UserFriendsGroupController.findMultiple',

    // Products
    'get    /api/products/:id':                  'ProductController.find',
    'post   /api/products':                      'ProductController.create',
    'put    /api/products':                      'ProductController.update',
    'delete /api/products/:id':                  'ProductController.delete',
    'get    /api/products*':                     'ProductController.findMultiple'

    // If a request to a URL doesn't match any of the custom routes above,
    // it is matched against Sails route blueprints.  See `config/blueprints.js`
    // for configuration options and examples.

};
