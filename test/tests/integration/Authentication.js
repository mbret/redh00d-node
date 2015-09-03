var request = require('supertest');
var async = require('async');
var agent;
var app;

/**
 * Test several authentication scenarios that involves more than one request.
 */
describe('integration.Authentication', function() {

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    after(function(done) {
        done();
    });

    /**
     * JWT authentication scenario
     * - The client ask for a token with email/password
     * - The client use token for each request
     */
    describe('jwt', function(){
        var token;
        it('should return access token', function(done){
            request(app).post('/auth/login').send({email: sails.config.test.user.email, password: sails.config.test.userPassword})
                .expect(200)
                .expect(function(res){
                    if( !res.body.token ) throw new Error("No token");
                    token = res.body.token;
                })
                .end(done);
        });
        it('should now authenticate thanks to this token', function(done){
            request(app).get('/events').set('Authorization', 'JWT ' + token).expect(200, done);
        });

    });
    // @todo facebook

    // @todo google


});