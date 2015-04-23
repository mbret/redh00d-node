'use strict';

var path     = require('path'),
    url      = require('url'),
    passport = require('passport'),
    jwt      = require('jsonwebtoken');

// Load authentication protocols
passport.protocols = require('./protocols');

/**
 * Load all strategies defined in the Passport configuration
 *
 * Will use the passport.use( new Strategy ... ) for all registered strategies.
 *
 * For more information about each strategy refer to their website
 *
 * For more information on the providers supported by Passport.js, check out:
 * http://passportjs.org/guide/providers/
 *
 */
passport.loadStrategies = function () {
  var self       = this;
  var strategies = sails.config.passport.strategies;

  Object.keys(strategies).forEach(function (key) {
        var options = { passReqToCallback: true };
        var Strategy;

      // Local strategy
      if (key === 'local') {
          _.extend(options, strategies[key].options);

          Strategy = strategies[key].strategy;

          self.use(new Strategy(options, self.protocols.local));
      }
      // Fb, basic, etc
      else{
          var protocol = strategies[key].protocol; // auth protocol
          var callback = strategies[key].callback;

          if (!callback) {
              callback = path.join('auth', key, 'callback');
              //throw Error('No callback specified');
          }

          Strategy = strategies[key].strategy;

          var baseUrl = sails.getBaseurl();

          switch (protocol) {
              case 'oauth':
              case 'oauth2':
                  options.callbackURL = url.resolve(baseUrl, callback);
                  break;

              case 'openid':
                  options.returnURL = url.resolve(baseUrl, callback);
                  options.realm     = baseUrl;
                  options.profile   = true;
                  break;
          }

          // Merge the default options with any options defined in the config. All
          // defaults can be overridden, but I don't see a reason why you'd want to
          // do that.
          _.extend(options, strategies[key].options);

          self.use(new Strategy(options, self.protocols[protocol]));
      }
  });
};

/**
 * Create an authentication endpoint
 *
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 *
 * @param  {Object} req
 * @param  {Object} res
 */
passport.endpoint = function (req, res) {
    var strategies = sails.config.passport.strategies
        , provider   = req.param('provider')
        , options    = {};

    // If a provider doesn't exist for this endpoint, send the user back to the
    // login page
    if (!strategies.hasOwnProperty(provider)) {
        return res.notFound();
    }

    // Attach scope if it has been set in the config
    if (strategies[provider].hasOwnProperty('scope')) {
        options.scope = strategies[provider].scope;
    }

    // Redirect the user to the provider for authentication. When complete,
    // the provider will redirect the user back to the application at
    //     /auth/:provider/callback
    // The verify callback is not called here !!
    sails.log.info('passport.endpoint -> provider: ' + provider + ' with options: ', options);
    this.authenticate(provider, options)(req, res);
};


/**
 * Connect a third-party profile to a local user
 *
 * This is where most of the magic happens when a user is authenticating with a
 * third-party provider. What it does, is the following:
 *
 *   1. Given a provider and an identifier, find a matching Passport.
 *   2. From here, the logic branches into two paths.
 *
 *     - A user is not currently logged in:
 *       1. If a Passport wasn't found, create a new user as well as a new
 *          Passport that will be assigned to the user.
 *       2. If a Passport was found, get the user associated with the passport.
 *
 *     - A user is currently logged in:
 *       1. If a Passport wasn't found, create a new Passport and associate it
 *          with the already logged in user (ie. "Connect")
 *       2. If a Passport was found, nothing needs to happen.
 *
 * As you can see, this function handles both "authentication" and "authori-
 * zation" at the same time. This is due to the fact that we pass in
 * `passReqToCallback: true` when loading the strategies, allowing us to look
 * for an existing session in the request and taking action based on that.
 *
 * For more information on auth(entication|rization) in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 * http://passportjs.org/guide/authorize/
 *
 * @param {Object}   req
 * @param {Object}   query
 * @param {Object}   profile
 * @param {Function} next
 */
passport.connect = function (req, query, profile, next) {
    var user = {}
        , provider;

    // Get the authentication provider from the query.
    query.provider = req.param('provider');

    // Use profile.provider or fallback to the query.provider if it is undefined
    // as is the case for OpenID, for example
    provider = profile.provider || query.provider;

    // If the provider cannot be identified we cannot match it to a passport so
    // throw an error and let whoever's next in line take care of it.
    if (!provider){
        return next(new Error('No authentication provider was identified.'));
    }

    // If the profile object contains a list of emails, grab the first one and
    // add it to the user.
    if (profile.hasOwnProperty('emails')) {
        user.email = profile.emails[0].value;
    }
    // If the profile object contains a username, add it to the user.
    if (profile.hasOwnProperty('username')) {
        user.username = profile.username;
    }

    // If neither an email or a username was available in the profile, we don't
    // have a way of identifying the user in the future. Throw an error and let
    // whoever's next in the line take care of it.
    if (!user.username && !user.email) {
        return next(new Error('Neither a username nor email was available'));
    }

    // Try to get the possible passport for this provider AND for this user (identifier)
    UserPassport.findOne({
        provider   : provider
        , identifier : query.identifier.toString()
    })
        .then(function(userPassport){
            
            // This is the first time this user authenticate with this 
            // provider to the api, create passport and user
            if (!userPassport) {
                //console.log('NO PROVIDER');
                // @todo
                // We try to find a possible user
                // If we find a user with this email it means that it's the first time the user use a provider
                // to authenticate. 
                return User.findOne({email: user.email})
                    .then(function(userFound){
                   
                        if(userFound){
                            return userFound;
                        }
                        else{
                            return User.create(user);
                        }
                        
                    })
                    .then(function(user){
                        query.user = user.id;

                        return UserPassport.create(query).then(function(entry){
                            return user;
                        });
                    });
                
            }
            // Scenario: An existing user is trying to log in using an already
            //           connected passport.
            // Action:   Get the user associated with the passport.
            else {
                //console.log('ONE PROVIDER');
                // Fetch the user associated with the Passport
                return User.findOne(userPassport.user.id);
            }
        })
        .then(function(user){
            return next(null, user);
        })
        .catch(function(err){
            if (err.code === 'E_VALIDATION') {
                if (err.invalidAttributes.email) {
                    next(new Error('Error.Passport.Email.Exists'));
                }
                else {
                    next(err);
                }
            }
            return next(err);
        });

};


/**
 *  
 * @param user
 * @returns {*}
 */
passport.issueAccessToken = function(user){
    var secretKey = sails.config.passport.token.secret;
    return jwt.sign({user:user.id}, secretKey, {
        algorithm: sails.config.passport.token.options.algorithm || 'HS256',
        expiresInSeconds: sails.config.passport.token.options.expiresInSeconds || 60 * 24,
        audience: sails.config.passport.token.options.audience,
        subject: sails.config.passport.token.options.subject,
        issuer: sails.config.passport.token.options.issuer
    });
};

passport.serializeUser(function (user, next) {
    next(null, user.id);
});

passport.deserializeUser(function (id, next) {
    User.findOne(id).populate('role').exec(next);
});

module.exports = passport;