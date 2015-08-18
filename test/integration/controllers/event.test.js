var request = require('supertest');
var should  = require('chai').should();

describe('integration.controllers.event', function() {

    var app;

    before(function(done){
        app = sails.hooks.http.app;
        done();
    });

    describe("GET", function(){

        var events; // list of events to test

        before(function(done){
            return Promise
                .all([
                    sails.models.event.create({
                        title: 'qdqsd',
                        description:'Venez tous nue',
                        author: 2,
                        location: 'Toul',
                        date: '2014-12-31',
                        id: 1
                    }),
                    sails.models.event.create({
                        title: 'sdfsdf',
                        description:'On va fumer de la bonne grosse beu !!',
                        author: 2,
                        location: 'Coloc',
                        date: '2014-12-01'
                    }),
                ])
                .then(function(results){
                    events = results;
                    done();
                })
                .catch(done);
        });

        after(function(done){
            sails.models.event
                .destroy([events[0].id, events[1].id])
                .then(function(destroyed){
                    done();
                })
                .catch(done);
        });

        it('should respond 400', function(done){
            request(app).get(sails.config.routesDef.events + '/x').set('Authorization', sails.config.test.userAuth)
                .expect(400)
                .end(done);
        });

        it('should respond 404', function(done){
            request(sails.hooks.http.app).get(sails.config.routesDef.events + '/99999').set('Authorization', sails.config.test.userAuth)
                .expect(404)
                .end(done);
        });

        it('should respond an event', function(done){
            request(sails.hooks.http.app).get(sails.config.routesDef.events + '/' + events[0].id).set('Authorization', sails.config.test.userAuth)
                .expect(function(res){
                    res.body.should.have.property('id');
                })
                .end(done);
        });

        it('should respond list of events', function(done){
            request(sails.hooks.http.app).get(sails.config.routesDef.events).set('Authorization', sails.config.test.userAuth)
                .expect(function(res){
                    res.body.should.not.be.empty;
                })
                .end(done);
        })

    });

    describe("POST", function(){

        // Model data for event rest creation
        // This object represent a valid object to send in order to create an event
        var eventsParamsTest = {
            title: '456',
            description: "foo",
            location: "bar",
            date: new Date()
        };

        before(function(done){
            done();
        });

        // Destroy all events
        afterEach(function(done){
            sails.models.event
                .destroy()
                .then(function(destroyed){
                    done();
                })
                .catch(done);
        });

        it('should reject me as a visitor', function(done){
           request(app)
               .post(sails.config.routesDef.events)
               .expect(401, done);
        });

        it('should create an event', function(done){
            request(app).post(sails.config.routesDef.events).set('Authorization', sails.config.test.userAuth)
                .send(eventsParamsTest)
                .expect(201)
                .expect(function(res){
                    res.body.should.have.property('id');
                    res.body.should.have.property('title');
                    res.body.title.should.equal(eventsParamsTest.title);
                })
                .end(done);
        });

        describe('should not create an event', function(){

            // Create an event for test purpose
            // This event is clear only at the end "after"
            before(function(done){
                sails.models.event
                    .create({
                        author: sails.config.test.user.id,
                        title: eventsParamsTest.title,
                        description: eventsParamsTest.description,
                        location: eventsParamsTest.location,
                        date: eventsParamsTest.date
                    })
                    .then(function(event){
                        done();
                    })
                    .catch(done);
            });

            after(function(done){
                sails.models.event
                    .destroy()
                    .then(function(destroyed){
                        done();
                    })
                    .catch(done);
            });

            it('should revoke because event exist', function(done){
                request(app).post(sails.config.routesDef.events).set('Authorization', sails.config.test.userAuth)
                    .send(eventsParamsTest)
                    .expect(400)
                    .end(done);
            });

            it('should revoke because no params', function(done){
                request(app).post(sails.config.routesDef.events).set('Authorization', sails.config.test.userAuth)
                    .expect(400)
                    .end(done);
            });

            it('should revoke because invalid title', function(done){
                var params = eventsParamsTest;
                delete params.title;
                request(app).post(sails.config.routesDef.events).set('Authorization', sails.config.test.userAuth)
                    .send(params)
                    .expect(400)
                    .end(done);
            });

            it('should revoke because invalid location', function(done){
                var params = eventsParamsTest;
                delete params.location;
                request(app).post(sails.config.routesDef.events).set('Authorization', sails.config.test.userAuth)
                    .send(params)
                    .expect(400)
                    .end(done);
            });
        });

    })
});