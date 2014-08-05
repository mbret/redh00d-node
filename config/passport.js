var passport = require( "passport" ),
    BasicStrategy = require('passport-http').BasicStrategy;


/**
 * This is the basic authentication for the api.
 * Customer just need to include username/password values on Basic Auth request
 * Use only with https
 * @todo with api key
 */
passport.use(
    new BasicStrategy(
        function (email, password, done) {
            if( email)
            console.log(email, password);
            User.findOne( {email: email}, function (err, user) {
                if( err) return done(err);
                if( !user) return done( null, false );

                user.validatePassword(password, function(err, valid){
                    if( !valid ) return done(null, false);
                    done(null, user);
                });
            });
    })
);