var request = require('supertest');
var agent;
var app;

describe('AuthenticationIntegration', function() {

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    after(function(done) {
        done();
    });

    describe('basicAuth', function(){
        it('should return 200 thanks to good credentials', function(done){
            request(app).get('/events') .send().set('Authorization', sails.config.test.userAuth).expect(200, done);
        });
    });

    // @todo facebook

    // @todo google


});