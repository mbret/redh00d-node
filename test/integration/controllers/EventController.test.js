var request = require('supertest');
var should  = require('chai').should();

describe('EventController', function() {

    var events; // list of events to test
    var app;

    before(function(done){
        app = sails.hooks.http.app;
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

        it('should respond event with id x', function(done){
            request(sails.hooks.http.app).get(sails.config.routesDef.events + '/' + events[0].id).set('Authorization', sails.config.test.userAuth)
                .expect(function(res){
                    res.body.should.have.property('event');
                    res.body.event.should.have.property('id');
                })
                .end(done);
        });

        it('should respond 404', function(done){
            async.series([
                function(callback){
                    request(sails.hooks.http.app).get(sails.config.routesDef.events + '/x').set('Authorization', sails.config.test.userAuth).expect(404).end(callback);
                },
                function(callback){
                    request(sails.hooks.http.app).get(sails.config.routesDef.events + '/99999').set('Authorization', sails.config.test.userAuth).expect(404).end(callback);
                }
            ], function(err, results){
                if(err) return done(err);
                done();
            });
        });

        it('should respond list of events', function(done){
            request(sails.hooks.http.app).get(sails.config.routesDef.events).set('Authorization', sails.config.test.userAuth)
                .expect(function(res){
                    res.body.should.have.property('events');
                    res.body.events.should.not.be.empty;
                })
                .end(done);
        })

    });

    describe("POST /events", function(){
        it('should reject me as a visitor', function(done){
           request(app).post(sails.config.routesDef.events).expect(401, done);
        });

        it('should create an event', function(done){
            request(app).post(sails.config.routesDef.events).set('Authorization', sails.config.test.userAuth)
                .expect(501) // not implemented
                //.expect(function(res){
                //    res.body.should.have.property('event');
                //    res.body.event.should.have.property('id');
                //})
                .end(done);
        });
    })
});