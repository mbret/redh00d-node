'use strict';

var request = require('supertest');
var assert = require("assert");
var should  = require('chai').should();
var expect = require('chai').expect;

describe('integration.controllers.auth', function() {

    var app;
    
    before(function(done){
        app = sails.hooks.http.app;
        done();
    });

    describe('login', function(){

        it('should login and respond with required data', function(done){
            request(app).post('/auth/login').send(sails.config.testData.userCredentials)
                .expect(200)
                .expect(function(res){
                    res.body.should.have.property('token');
                    res.body.token.should.not.be.empty;
                })
                .end(done);
        });
    });
    
    describe("register", function(){

        it('should return 400 because of invalid data', function(done){
            var dataSets = [
                null,
                {email: 'toto'},
                {password: 'toto'},
                {email: null, password: 'toto'},
                {email: 'toto', password: 'toto'},
                {email: 'user@user.com', password: 'password'} // user exist
            ];
            async.each(dataSets, function(data, cb){
                request(app).post('/auth/register').send(data)
                    .expect(400, cb)
            }, function(err){
                done(err);
            });
        });
        
        it('should return 201 and created user with required data', function(done){
            var id = -1;
            request(app).post('/auth/register').send({email: 'toto@gmail.com', password: 'toto'})
                .expect(201)
                // Check response
                .expect(function(res){
                    res.body.should.have.property('user');
                    res.body.user.should.have.property('id');
                    res.body.should.have.property('token');
                    res.body.token.should.not.be.empty;
                })
                // Check db creation
                .end(function(err, res){
                    if (err) return done(err);
                    // Check user
                    return sails.models.user.findOne(res.body.user.id)
                        .then(function(user){
                            expect(user).to.be.a('object');
                        })
                        // Check passport
                        .then(function(){
                            return sails.models.userpassport.findOne({ protocol : 'local', user: res.body.user.id})
                                .then(function(passport){
                                    expect(passport).to.be.a('object');
                                });
                        })
                        .then(done)
                        .catch(done);
                })
        });

    });

    describe('resetPassword', function(){

        //it('should authorize request', function(done){
        //    request(app).post('')
        //});
    });


});