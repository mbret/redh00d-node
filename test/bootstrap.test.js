var Sails = require('sails');
var Q = require('q');

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
        DatabaseService.seedDefaultData().then(function() {
            return DatabaseService.seedTestData().then(function() {
                return done(null, sails);
            });

        }).fail(function (err) {
            return done( new Error(err) );
        });

    });
});

after(function(done) {
    // here you can clear fixtures, etc.
    sails.lower(done);
});