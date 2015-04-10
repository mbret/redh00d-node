var Sails = require('sails');
var ConfigOverrides = require('../config/env/testing');
var sails;

before(function(done) {

    Sails.lift(ConfigOverrides, function(err, server) {
        if (err) return done(err);
        sails = server;
        
        // load detail of current user
        User.findOne({email: 'user@user.com'})
            .then(function(user){
                sails.config.test.user = user;
                
                // load detail of current admin user
                return User.findOne({email: 'admin@admin.com'}).then(function(user){
                    sails.config.test.admin = user;
                    done(null, sails);
                });
            })
            .catch(done);
    });
});

after(function(done) {
    // here you can clear fixtures, etc.
    sails.lower(done);
});