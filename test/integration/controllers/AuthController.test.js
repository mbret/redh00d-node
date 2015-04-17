'use strict';

var request = require('supertest');

describe('AuthControllerIntegration', function() {

    var app;
    
    before(function(done){
        app = sails.hooks.http.app;
        done();
    });

    beforeEach(function(done){
        done();
    });

    after(function(done){
        done();
    });

    afterEach(function(done){
        done();
    });

    describe('login', function(){
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
    });
    
    describe("register", function(){

        it('should return 400 because of invalid data', function(done){
            request(app).post('/auth/register').send({email: 'toto', password: 'toto'})
                .expect(400, done);
        });

        it('should return 400 because of invalid data', function(done){
            request(app).post('/auth/register').send({email: null, password: 'toto'})
                .expect(400, done);
        });
        
        it('should return created user with access token', function(done){
            var id = -1;
            request(app).post('/auth/register').send({email: 'toto@gmail.com', password: 'toto'})
                .expect(201)
                .expect(function(res){
                    if( !res.body.token || !res.body.user ) throw new Error("No token or no user");
                    id = res.body.user.id;
                })
                .end(function(err){
                    return User.findOne(id).then(function(user){
                        if(!user) return done(new Error('User not crated in db'));
                        return done();
                    });
                })
        });

    });


});