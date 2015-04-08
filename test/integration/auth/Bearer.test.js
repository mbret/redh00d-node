var request = require('supertest');
var async = require('async');
var agent;
var app;

describe('BearerAuthIntegration', function() {

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    after(function(done) {
        done();
    });

    describe('Token', function(){
        it('should return 401 because of invalid token', function(done){
            request(app).get('/events').set('Authorization', 'Bearer 4qsd56q4sd5').expect(401, done);
        });
        it('should return 401 because of no token provided', function(done){
            request(app).get('/events').expect(401, done);
        });
    });


});