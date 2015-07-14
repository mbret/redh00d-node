var path = require('path');
var Sails = require('sails');
var config = require('./tools/config-loader')(path.join(__dirname, '..', 'config', 'env', 'testing'));
var sails;

before(function(done) {

    Sails.lift(config, function(err, server) {
        if (err) return done(err);
        sails = server;
        
        // load detail of current user
        User.findOne({email: 'user@user.com'})
            .then(function(user){
                console.log(sails.config.test);
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