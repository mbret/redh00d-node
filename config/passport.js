var passport = require( "passport" ),
    LocalStrategy = require('passport-local').Strategy,
    BasicStrategy = require('passport-http').BasicStrategy;
    RememberMeStrategy = require('passport-remember-me').Strategy;

/**
 * Passport setup
 */

/*=============================================================

                Passport session setup.

 =============================================================*/

/**
 * We tell to passport how to serialize the user after logIn() function
 * Here we keep only ID
 */
passport.serializeUser( function (user, cb) {
    cb(null, user.ID);
});

/**
 * We tell to passport how to retrieve user. Passport middleware retrieve user and then place it into req.user.
 * Then we can process our routes. with the user inside req.user.
 */
passport.deserializeUser( function (userId, cb) {
    User.findOne({ ID: userId }, function (err, user) {
        cb(err, user);
    });
});

/*=============================================================

            Passport authentication strategies

 =============================================================*/

/**
 * Passport Local Strategy.
 * This strategy is used by passport when passport middleware takes hand on.
 * it means that when passport.authenticate( 'local', function (err, user, info).. is called
 *
 * Try to find a user with the email and then check if the password are the same.
 * Return a user if everything is ok.
 */
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email'
        },
        function (email, password, cb) {

            sails.log.debug('conf/passport.js : LocalStrategy is processing. email=%s', email);
            User.findOne( {email: email } , function (err, user) {
                if(err) return cb(err);

                // No user was found
                if(!user) {
                    return cb(null, false, { message: 'Unknown user' });
                }

                // Validate user password
                user.validatePassword( password, function (err, isValid) {
                    if(err) return cb(err);

                    // If the password was not valid
                    if(!isValid)
                        return cb(null, false, { message: 'Invalid password' });

                    // We are successfully authenticated, return the user instance
                    cb(null, user);
                });
            });
        }
    )
);

/**
* Passport Remember Me (cookie) Startegy
*
* This strategy consumes a remember me token, supplying the user the
* token was originally issued to. The token is single-use, so a new
* token is then issued to replace it.
*/

//passport.use(new RememberMeStrategy(
//    function (token, cb) {
//        User.consumeSessionToken(token, function (err, user) {
//            cb(err, user);
//        });
//    },
//    User.issueSessionToken
//));

/**
* Passport Basic HTTP Auth Startegy
*/
passport.use(
    new BasicStrategy( function (apiKey, password, cb) {
        if (apiKey !== password) {
            return cb( new Error( "API key and password do not match" ) );
        }
        // Find the user by API key.  If there is no user with the given
        // API key, or the password is not correct, set the user to `false` to
        // indicate failure.  Otherwise, return the authenticated `user`.
        User.findOneByApiKey( apiKey, function (err, user) {
            if (err) return cb(err);
            if (!user) return cb( null, false, { message: 'Invalid or unknown API key' } );
            cb(null, user);
        });
    })
);