/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require('passport');

module.exports = {


    /**
     * Create a new session (log in user).
     *
     * @module      :: Controllers
     * @description :: Use and give control to the passport middleware
     * @docs        ::
     * @param       :: req should contain email/password
     */
    login: function(req, res, next) {

        // Call authenticate function of passport which act as a new route and manage req, res etc by itself
        passport.authenticate( 'local', function (err, user, info) {
            if (err) return res.serverError(err);

            // Authentication failed (bad params, no user)
            if (!user){
                return res.badRequest('Authentication failed', info);
            }

            // Log the user in (insert user id inside session)
            req.logIn(user, option = null, function (err) {
                if(err) return res.serverError(err);

                // If remember me option was specified, issue a session token
//                User.issueSessionToken( user, function (err, token) {
//                    if(err) return res.serverError(err);
//                    res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 60*60*24*30 });
                    // ... and return user data as JSON
                    res.ok(
                        {
                            user: user.toJSON()
                        }
                    );
//                });
            });

        })(req, res, next);
    },




    /**
     * Logout a user
     * @description :: The user should be inside req.user. This method destroy the session relative to user.
     * @param cb
     * @returns {*}
     */
    logout: function(req, res, next){

        // Clear user's session tokens
//        req.user.sessionTokens = [];
//        req.user.save(function (err) {
//            if(err) return res.serverError(err);

            // Log out the user
            req.logout(); // remove req.user and clean login session

            // Send empty response
            res.ok();
//        });
    },




    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to UserController)
     */
    _config: {}

  
};
