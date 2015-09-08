var request = require('supertest');
var agent;
var app;

describe('integration.auth.unauthorized', function() {

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    describe('not logged', function() {
        it('should return 401 because no credentials', function(done){
            request(app).get('/events').send()
                .expect(401, done);
        });
        it('should return 401 because bad credentials', function(done){
            request(app).get('/events').send().set('Authorization', sails.config.test.userAuth + '^$89789')
                .expect(401, done);
        });
    });


});