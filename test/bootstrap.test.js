var path = require('path');
var Sails = require('sails');
var config = require('./lib/config-loader')(path.join(__dirname, '..', 'config', 'env', 'testing'), 'testing');
var dbProvider = require('./lib/db-provider');
var sails;

before(function(done) {

    Sails.lift(config, function(err, server) {
        if (err) return done(err);
        sails = server;

        // provide db
        dbProvider()
            .then(function(){
                // load detail of current user
                return sails.models.user.findOne({email: 'user@user.com'})
                    .then(function(user){
                        if(!user){
                            done(new Error('user@user.com not found'));
                        }
                        sails.config.test.user = user;
                    });
            })
            .then(function(user){
                // load detail of current admin user
                return sails.models.user.findOne({email: 'admin@admin.com'})
                    .then(function(user){
                        if(!user){
                            done(new Error('admin@admin.com not found'));
                        }
                        sails.config.test.admin = user;
                    });
            })
            .then(function(user){
                done(null, sails);
            })
            .catch(done);

    });
});

after(function(done) {
    // here you can clear fixtures, etc.
    sails.lower(done);
});