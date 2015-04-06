var Sails = require('sails');
var sails;

before(function(done) {
    Sails.lift({

        // configuration for testing purposes
        log:{
            level: "error"
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
            user: null,
            admin: null,
            userPassword: 'password',
            userAuth: "Basic dXNlckB1c2VyLmNvbTpwYXNzd29yZA==", // user@user.com / password
            adminAuth: 'Basic YWRtaW5AYWRtaW4uY29tOnBhc3N3b3Jk', // admin@admin.com / password
            toolsPath: __dirname + '/tools'
        }
    }, function(err, server) {
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