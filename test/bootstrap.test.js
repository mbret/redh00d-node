var Sails = require('sails');

before(function(done) {
    Sails.lift({
        // configuration for testing purposes
        log:{
            level: "error"
        },
        models: {
            migrate: 'drop' // erase database before each launch
        },
        general: {
            initDatabase: false
        }
    }, function(err, sails) {
        if (err) return done(err);

        // here you can load fixtures, etc.
        User.create({
            email: 'admin@admin.com', password: 'password', firstName: 'Admin', lastName: 'Admin'

        }).then(function(){
            return done(null, sails);

        }).fail(function(err){
            return done( new Error(err) );

        });
    });
});

after(function(done) {
    // here you can clear fixtures, etc.
    sails.lower(done);
});