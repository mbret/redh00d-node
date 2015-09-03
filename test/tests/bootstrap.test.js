var path = require('path');
var Sails = require('sails');
var SAILS_APP_PATH = path.join(__dirname, '..', '..');
var TEST_LIB_PATH = path.join(__dirname, '../lib');
var config = require(path.join(TEST_LIB_PATH, 'config-loader'))(path.join(SAILS_APP_PATH, 'config', 'env', 'testing'), 'testing');
//var dbProvider = require('./lib/db-provider');
var spawn = require('child_process').spawn;
var sails;


before(function(done) {

    Sails.lift(config, function(err, server) {
        if (err) return done(err);
        sails = server;

        // Initialize test database
        // call the db tool
        // No need to drop as the config is already set to drop
        var execScript = path.join(SAILS_APP_PATH, 'tools/db-handler');
        exec = spawn('node', [execScript, 'init', '-e', 'testing', '-c', 'mysql'], {stdio: 'pipe'});

        exec.stderr.on('data', function (data) {
            console.error('Error on child process: ' + data);
        });

        exec.on('close', function (code){
            if(code !== 0){
                done(new Error('There was one or more error with child process'));
            }

            // load detail of current user
            sails.models.user.findOne({email: 'user@user.com'})
                .then(function(user){
                    if(!user){
                        done(new Error('user@user.com not found'));
                    }
                    sails.config.test.user = user;
                })
                .then(function(){
                    // load detail of current admin user
                    return sails.models.user.findOne({email: 'admin@admin.com'})
                        .then(function(user){
                            if(!user){
                                done(new Error('admin@admin.com not found'));
                            }
                            sails.config.test.admin = user;
                        });
                })
                .then(function(){
                    done();
                })
                .catch(done);
        });
    });
});

after(function(done) {
    // here you can clear fixtures, etc.
    sails.lower(done);
});