var request = require('supertest');
var async = require('async');
var agent;
var app;

/**
 * The local authentication method is only available for signing route.
 * The purpose is to get back a token in order to authenticate through api then.
 */
describe('integration.auth.local', function() {

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    describe('default', function(){

        it('should return 401 because local auth is not authorized on classic routese', function(done){
            request(app).post('/helper/auth/any').send({email: sails.config.test.user.email, password: sails.config.test.userPassword})
                .expect(401, done);
        });

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