var request = require('supertest');
var async = require('async');
var agent;
var app;

describe('integration.auth.Local', function() {

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    after(function(done) {
        done();
    });

    describe('Login', function(){
        it('should return 400 (Invalid credentials)', function(done){
            async.parallel([
                function(cb){
                    request(app).post('/auth/login').send({email: sails.config.test.user.email, password: 'sdfsdf'}).expect(400, cb);
                },
                function(cb){
                    request(app).post('/auth/login').send({email: 'sdfsdf', password: 'sdfsdf'}).expect(400, cb);
                }
            ], function(err){
                done(err);
            });
        });
        it('should return 200 thanks to good credentials on classic route', function(done){
            request(app).post('/auth/login').send({email: sails.config.test.user.email, password: sails.config.test.userPassword}).expect(200, done);
        });
    });


});