var Sails = require('sails');
var sails;

before(function(done) {
    Sails.lift({

        // configuration for testing purposes
        log:{
            level: "warn"
        },

        fillDb: true,
        autoLogon: false,

        models: {
            migrate: 'drop' // erase database before each launch
        },

        general: {
            initDatabase: false
        },

        test: {
            userEmail: '',
            userPassword: '',
            userAuth: "Basic dXNlckB1c2VyLmNvbTpwYXNzd29yZA==", // user@user.com / password
            adminAuth: 'Basic YWRtaW5AYWRtaW4uY29tOnBhc3N3b3Jk', // admin@admin.com / password
            toolsPath: __dirname + '/tools'
        }
    }, function(err, server) {
        if (err) return done(err);
        sails = server;
        done(null, sails);
    });
});

after(function(done) {
    // here you can clear fixtures, etc.
    sails.lower(done);
});