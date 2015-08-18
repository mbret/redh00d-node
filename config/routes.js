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
module.exports = {

    routes: {

        // This path is used to do some stuff in any way before all controllers
        // We could have call a controller which implement function(req, res, next) and call at last next()
        // but due to short logic/code a function placed here is more practice.
        // It's not possible to use middleware instead because before router we should have to hard check the request and its pain (no req.wantsJson available)
        // and after router all these routes has been checked !
        '*': function preDispatch(req, res, next) {
            return next();
        },

        'get /doc': function (req, res) {
            return res.send('<iframe style="border:none;height:97%;width:100%;" src="'+sails.config.all.docURL+'"></iframe>');
        },

        'get /': function(req, res){
            require('http').get('http://api.icndb.com/jokes/random?firstName=Chuck&amp;lastName=Norris', function(resp){
                var str = '';
                resp.on('data', function(chunk){
                    str += chunk;
                });
                resp.on('end', function(){
                    res.ok(JSON.parse(str).value.joke);
                })
            }).on("error", function(e){
                res.ok('It works!');
            });

        },


        /***************************
         *
         * Development relatives routes
         *
         ***************************/
        'get  /dev/db': 'DevController.dumpDatabase',

        'get    /helper/me' : 'HelperController.me',
        'get    /ping': 'HelperController.ping',
        'get    /helper/auth/jwt': 'HelperController.authJWT',
        'get    /helper/auth/basic': 'HelperController.authBasic',
        'get    /helper/authorized': 'HelperController.authorizedGet',
        'post   /helper/authorized': 'HelperController.authorizedPost',

        // Providers auth
        'get    /auth/:provider': 'AuthController.provider',
        'get    /auth/facebook/callback': 'AuthController.facebookCallback',
        'post   /auth/login': 'AuthController.login',
        'post   /auth/register': 'AuthController.register',

        /***************************
         *
         * EVENT relatives routes
         *
         ***************************/
        'get     /events/:id':                   'EventController.find',
        'get     /events/:id/members/:idmember': 'EventController.findMember',
        'post    /events':                       'EventController.create',
        'delete  /events/:id':                   'EventController.delete',
        'delete  /events/:id/members/:idmember': 'EventController.deleteMember',
        'put     /events/:id':                   'EventController.update',
        'get     /events/:id/members*':          'EventController.findMultipleMembers',
        'get     /events*':                      'EventController.findMultiple',

        // Invitations
        'post    /events/:idevent/invitations':     'EventController.createInvitation',
        'get     /events/:idevent/invitations/:id': 'InvitationController.find',
        'put     /events/:idevents/invitations':    'InvitationController.update', // author can cancel / receiver can cancel, accept
        'delete  /events/:idevent/invitations/:id': 'InvitationController.delete', // put state on cancel
        'get     /events/:idevent/invitation*':     'InvitationController.findMultiple',

        /***************************
         *
         * USER relatives routes
         *
         ***************************/
        // this route can be used to retrieve a friend also
        // There are no users/x/friends/x or /any/x/users/x because user is a self living resource. Not dependant from other
        'get    /users/:id':                    'UserController.find',

        // List of users
        'post   /users':                                            'UserController.create',
        'put    /users/:id':                                        'UserController.update',
        'patch  /users/:id':                                        'UserController.patch', // password reset token
        'delete /users/:id':                                        'UserController.delete',

        // USER friendships relatives routes
        'get    /users/:userid/friendships/:id':                    'UserFriendShipController.find',
        'put    /users/:userid/friendships/:id':                    'UserFriendShipController.update',      // update request (a response for friends)
        'post   /users/:userid/friendships':                        'UserFriendShipController.create',      // Create a friendship request
        'get    /users/:userid/friendships*':                       'UserFriendShipController.findMultiple',

        'delete /users/:userid/friends/:idfriend':                  'UserFriendShipController.delete',      // cancel a friendship request

        // List of user friends, use /users/x to retrieve a friend
        'get    /users/:userid/friends*':                           'UserFriendShipController.FindFriends',

        // USER friends group relatives routes
        //'get    /users/:userid/friendsgroups/:id':                   'UserFriendGroupController.find',
        'post   /users/:userid/friendsgroups':                       'UserFriendGroupController.create',    // create a friends group
        //'post   /users/:userid/friendsgroups/:id/members':           'UserFriendGroupController.addMember',
        //'put    /users/:userid/friendsgroups':                       'UserFriendGroupController.update',
        //'delete /users/:userid/friendsgroups/:id':                   'UserFriendGroupController.delete',
        //'delete /users/:userid/friendsgroups/:id/members/:idmember': 'UserFriendGroupController.deleteMember',
        //'get    /users/:userid/friendsgroups*':                      'UserFriendGroupController.findMultiple',

        'post   /users/:email/password-reset':                      'AuthController.resetPassword',

        'get    /users*':                       'UserController.findMultiple',

        /***************************
         *
         * PRODUCTS relatives routes
         *
         ***************************/
        'get    /products/:id':                  'ProductController.find',
        'delete /products/:id':                  'ProductController.delete',
        'get    /products*':                     'ProductController.findMultiple',
        'post   /products':                      'ProductController.create',
        'put    /products':                      'ProductController.update'

    },

    routesDef: {
        events: '/events'
    }
};
