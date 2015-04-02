var request = require('supertest');

describe('EventController', function() {

    var events;

    before(function(done){
        Event.find().exec(function(err, entries){
            if(err) done(err);
            events = entries;
            done();
        });
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

    describe("GET /events", function(){

        it('should respond event with ID x', function(done){
            request(sails.hooks.http.app).get('/events/' + events[0].ID).set('Authorization', sails.config.test.userAuth)
                .expect(function(res){
                    if( !res.body.event || !res.body.event.ID === events[0].ID ) throw new Error("No event or wrong event, test with " + events[0].ID);
                })
                .end(done);
        });

        it('should respond 404', function(done){
            async.series([
                function(callback){
                    request(sails.hooks.http.app).get('/events/x').set('Authorization', sails.config.test.userAuth)
                        .expect(404).end(callback);
                },
                function(callback){
                    request(sails.hooks.http.app).get('/events/99999').set('Authorization', sails.config.test.userAuth)
                        .expect(404).end(callback);
                }
            ], function(err, results){
                if(err) return done(err);
                done();
            });
        });

        it('should respond list of events', function(done){
            request(sails.hooks.http.app).get('/events').set('Authorization', sails.config.test.userAuth)
                .expect(function(res){
                    if( !res.body.events || res.body.events.length < 1 ) throw new Error("No events whereas at least one should be present");
                })
                .end(done);
        })

    });

});