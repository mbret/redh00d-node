var request = require('supertest');
var async = require('async');
var agent;
var app;

describe('integration.auth.basic', function() {

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
        it('should return 401 because no Auth provided', function(done){
            request(app).get('/helper/auth/basic').set('Authorization', '').expect(401, done);
        });
        it('should return 401 because no Auth provided', function(done){
            request(app).get('/helper/auth/basic').expect(401, done);
        });
        it('should return 400 (bad request)', function(done){
            request(app).get('/helper/auth/basic').set('Authorization', 'Basic dXNlckB1c3Nlci5jb206cGFzc3dvcmQ=').expect(401, done);
        });
        // use correct mail / password of the user
        it('should return 200 thanks to good credentials on classic route', function(done){
            request(app).get('/helper/auth/basic').send().set('Authorization', sails.config.test.userAuth).expect(200, done);
        });
    });

});