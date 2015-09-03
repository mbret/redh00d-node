var request = require('supertest');
var async = require('async');
var agent;
var app;

describe('integration.auth.jwt', function() {

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    /**
     * Token test, a token must be injected with each request in order to be authenticated.
     * The token must follow the Authorization standard for JWT token.
     */
    describe('default', function(){

        it('should return 401 because of no token', function(done){
            request(app).get('/helper/auth/jwt').set('Authorization', 'JWT').expect(401, done);
        });

        it('should return 401 because of invalid token', function(done){
            request(app).get('/helper/auth/jwt').set('Authorization', 'JWT 4qsd56q4sd5').expect(401, done);
        });

        it('should revoke the token because of timeout', function(done){
            // Change the expiration time of the token, so the token will be immediately obsolete.
            sails.config.passport.token.options.expiresInSeconds = 1;
            var token = sails.hooks.passport.issueAccessToken(sails.config.test.user);
            setTimeout(function(){
                request(app).get('/helper/auth/jwt').set('Authorization', 'JWT ' + token).expect(401, done);
            }, 1000);
        });
    });


});