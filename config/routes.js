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
    'get    /api/events*':                      'EventController.findMultiple',

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

    /**
     * USER friendships relatives routes
     */
    // only users
    'get    /users/:userid/friendships-request/:id':    'UserFriendShipController.findRequest',
    'get    /users/:userid/friends/:id':                'UserFriendShipController.FindFriend',
    'post   /users/:userid/friendships-request':        'UserFriendShipController.createRequest', // Create a friendship request
    'delete /users/:userid/friendships/:id':            'UserFriendShipController.delete', // cancel a friendship
    'delete /users/:userid/friendships-request/:id':    'UserFriendShipController.deleteRequest', // cancel a friendship request
    'get    /users/:userid/friendships-request*':       'UserFriendShipController.findMultiple',
    'get    /users/:userid/friends*':                   'UserFriendShipController.FindFriends',

    /**
     * USER friendship group relatives routes
     */
    // only users
    'get    /api/users/:iduser/friendshipgroup/:id':            'UserFriendshipGroupController.find',
    'post   /api/users/:iduser/friendshipgroup':                'UserFriendshipGroupController.create',
    'post   /api/users/:iduser/friendshipgroup/:id/members':    'UserFriendshipGroupController.addMember',
    'put    /api/users/:iduser/friendshipgroup':                'UserFriendshipGroupController.update',
    'delete /api/users/:iduser/friendshipgroup/:id':            'UserFriendshipGroupController.delete',
    'delete /api/users/:iduser/friendshipgroup/:id/members/:id':'UserFriendshipGroupController.deleteMember',
    'get    /api/users/:iduser/friendshipgroup*':               'UserFriendshipGroupController.findMultiple'



    // If a request to a URL doesn't match any of the custom routes above,
    // it is matched against Sails route blueprints.  See `config/blueprints.js`
    // for configuration options and examples.

};
