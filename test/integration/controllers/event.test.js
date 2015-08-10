var request = require('supertest');
var should  = require('chai').should();

describe('integration.controllers.event', function() {

    var events; // list of events to test
    var app;

    before(function(done){
        app = sails.hooks.http.app;

        // create list of events
        return Promise
            .all([
                sails.models.event.create({name:'Soirée pyjama', description:'Venez tous nue', author: 2, place: 'Toul', date: '2014-12-31', id: 1}),
                sails.models.event.create({name:'Meeting redh00d', description:'On va fumer de la bonne grosse beu !!', author: 2, place: 'Coloc', date: '2014-12-01'}),
            ])
            .then(function(results){
                events = results;
                done();
            })
            .catch(done);
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

        it('should respond 400', function(done){
            request(app).get(sails.config.routesDef.events + '/x').set('Authorization', sails.config.test.userAuth).expect(400).end(done);
        });

        it('should respond 404', function(done){
            request(sails.hooks.http.app).get(sails.config.routesDef.events + '/99999').set('Authorization', sails.config.test.userAuth).expect(404).end(done);
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