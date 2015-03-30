var assert = require("assert");

describe('EventModel', function() {

    // var ...
    var baseEventData = {
        author: 1,
        name: "Event for test",
        description: "Join us !",
        place: "Toul",
        date: new Date()
    };

    before(function(done){
        done();
    });

    beforeEach(function(done){
        done();
    });

    after(function(done){
        done();
    });

    afterEach(function(done){
        done();
    });

    describe('Create test', function () {

        it ('should create a correct minimal event record', function (done) {
            Event.create(baseEventData).exec(function(err, event){
                if(err) throw new Error(err);
                if(!event) throw new Error('Event not created');
                if(event.author != 1
                    || event.name != 'Event for test'
                    || event.description != 'Join us !'
                    || event.place.length < 1
                    || ! event.date instanceof Date
                    || ! event.createdAt instanceof Date
                    || ! event.updatedAt instanceof Date
                    ){
                    throw new Error('Event malformed or incomplete');
                }
                return done();
            });
        });

        it ('should not create an event record', function (done) {

            // empty
            Event.create({}).exec(function(err){
                if( ! err || ! err.ValidationError) throw new Error('Event should have had validation errors');
            });

            // bad date
            newData = baseEventData;
            newData.date = 'qsd';
            Event.create(newData).exec(function(err){
                if( ! err || ! err.ValidationError) throw new Error('Event should have had date validation errors');
            });

            return done();
        });

    });



});