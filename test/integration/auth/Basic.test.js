var request = require('supertest');
var async = require('async');
var agent;
var app;

describe('BasicAuthIntegration', function() {

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    after(function(done) {
        done();
    });

    /**
     * Basic authentication
     * - The client provide email/password for each request
     */
    describe('basicAuth', function(){
        it('should return 400 (bad request)', function(done){
            request(app).post('/events').set('Authorization', 'Basic dXNlckB1c3Nlci5jb206cGFzc3dvcmQ=').expect(401, done);
        });
        it('should return 200 thanks to good credentials on classic route', function(done){
            request(app).get('/events').send().set('Authorization', sails.config.test.userAuth).expect(200, done);
        });
    });

});