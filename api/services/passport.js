var path     = require('path'),
    url      = require('url'),
    passport = require('passport');


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

passport.issueAccessToken = function(user){
    var tokenConfig = sails.config.passport.token;
    return require('jsonwebtoken').sign({user:user.id}, tokenConfig.secret, { expiresInMinutes: tokenConfig.expiresInMinutes });
};

passport.serializeUser(function (user, next) {
    next(null, user.id);
});

passport.deserializeUser(function (id, next) {
    User.findOne(id).populate('role').exec(next);
});

module.exports = passport;
