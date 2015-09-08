var request = require('supertest');
var async = require('async');
var agent;
var app;

describe('integration.scenario', function() {

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    /**
     * Scenario test case
     * - user subscribe
     * - then user try to authenticate with credentials
     */
    describe('I register and then use my credentials to authenticate', function(){

        var data = {email: '864$86@gmail.com', password: '^8$4^38$SDfsdfjlze7^$'};
        var auth = 'ODY0JDg2QGdtYWlsLmNvbTpeOCQ0XjM4JFNEZnNkZmpsemU3XiQ=';

        it('should register account', function(done){
            request(app).post('/auth/register')
                .send(data)
                .expect(201)
                .end(done);
        });

        it('should authenticate with credentials', function(done){
            request(app).get('/events').set('Authorization', 'Basic ' + auth).expect(200, done);
        });

    });

    describe('I sign-in using my credentials and then use my token to be authenticated', function(){
        var token;

        it('should return access token', function(done){
            request(app).post('/auth/login').send({email: sails.config.test.user.email, password: sails.config.test.userPassword})
                .expect(200)
                .expect(function(res){
                    token = res.body.token;
                })
                .end(done);
        });

        it('should now authenticate thanks to this token', function(done){
            request(app).get('/events').set('Authorization', 'JWT ' + token)
                .expect(200, done);
        });

    });


});