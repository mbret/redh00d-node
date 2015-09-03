var request = require('supertest');
var async = require('async');
var agent;
var app;

/**
 * Basic integration provide a way to authenticate each request with email/password.
 * It use a string encoded in base64 with this pattern "Basic %s" where %s is base64 email/password.
 *
 * This way of authentication does not allow persistence and each request must be authenticated.
 */
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
    describe('default', function(){

        it('should return 401 because no correct Authorization provided', function(done){
            async.parallel([
                function(cb){
                    request(app).get('/helper/auth/basic').set('Authorization', '')
                        .expect(401, cb);
                },
                function(cb){
                    request(app).get('/helper/auth/basic').set('Authorization', 'Basic ')
                        .expect(401, cb);
                },
                function(cb){
                    request(app).get('/helper/auth/basic')
                        .expect(401, cb);
                }
            ], done);
        });

        it('should return 401 because of invalid Authorization credentials', function(done){
            request(app).get('/helper/auth/basic').set('Authorization', 'Basic dXNlckB1c3Nlci5jb206cGFzc3dvcmQ=')
                .expect(401, done);
        });

        // use correct mail / password of the user
        it('should return 200 thanks to good credentials on classic route', function(done){
            request(app).get('/helper/auth/basic').send().set('Authorization', sails.config.testData.userAuthorization)
                .expect(200, done);
        });
    });

});