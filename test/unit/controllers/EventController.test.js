var request = require('supertest');
var base;
var app;

describe('EventController', function() {

    before(function(done){
        app = sails.hooks.http.app;
        base = {
            'Authorization': sails.config.test.userAuth
        };
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

    describe("GET /events", function(){

        it('should respond event with ID 1', function(done){
            request(app).get('/api/events/1').set(base)
                .expect(function(res){
                    if( !res.body.event || !res.body.event.ID == 1 ) throw new Error("No event or wrong event");
                })
                .end(done);
        });

        it('should respond 404', function(done){
            async.series([
                function(callback){
                    request(app).get('/api/events/x').set(base)
                        .expect(404).end(callback);
                },
                function(callback){
                    request(app).get('/api/events/20').set(base)
                        .expect(404).end(callback);
                }
            ], function(err, results){
                if(err) return done(err);
                done();
            });
        });

        it('should respond list of events', function(done){
            request(app).get('/events').set(base)
                .expect(function(res){
                    if( !res.body.events || res.body.events.length < 1 ) throw new Error("No events whereas at least one should be present");
                })
                .end(done);
        })

    });

});