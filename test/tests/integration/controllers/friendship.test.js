var path = require('path');
var request = require('supertest');
var assert = require("assert");
var TestHelper = require(path.join(process.env.TEST_LIB_PATH, 'test-helper'));

describe('integration.controllers.friendship', function() {

    var app;
    var user;

    before(function(done){
        app = sails.hooks.http.app;
        user = sails.config.test.user;
        done();
    });

    /**
     * Get a list of user friends
     */
    describe("GET users/userid/friends", function(){

        //it('should respond bad request', function(done){
        //    request(app).get('/users/x/friends').set('Authorization', sails.config.test.userAuth)
        //        .expect(400).end(done);
        //});

        //it('should respond a list of friends', function(done){
        //    request(app).get('/users/' + user.id + '/friends').set('Authorization', sails.config.test.userAuth)
        //        .expect(200)
        //        .expect(function(res){
        //            res.body.should.not.be.empty;
        //            res.body[0].should.have.property('email');
        //        })
        //        .end(done);
        //});

    });

    // https://developers.schoology.com/api-documentation/rest-api-v1/friend-request
    /**
     * /users/1/friendships
     */
    describe('post friendship', function(){

        var userB = null;
        before(function(done){
            TestHelper
                .createSimpleUser()
                .then(function(user){
                    userB = user.id;
                    done();
                })
                .catch(done);
        });

        it('should reject as visitor', function(done){
            request(app).post('/friendships')
                .expect(401)
                .end(done);
        });

        it('should respond bad request', function(done){
            request(app).post('/friendships').set('Authorization', sails.config.test.userAuth)
                .expect(400)
                .end(done);
        });

        it('should create a friend request from a to b', function(done){
           request(app).post('/friendships').set('Authorization', sails.config.test.userAuth)
               .send({user_id: userB})
               .expect(201)
               .end(function(err, res){
                   if(err) done(err);
                   done(new Error('todo'));
               });
        });

    });

    describe('put friendship', function(){

        before(function(done){
            // a ask b
            done();
        });

        it('should accept request from a', function(done){
            done();
        });

    });

    /**
     * friendships requests
     *
     * /users/1/friendships
     */
    describe('get friendships', function(){

        it('should return pending friendship', function(done){
            done();
        });

        it('should return accepted friendship', function(done){
            done();
        });

    });

    /**
     *
     * /users/1/friends
     */
    describe('get friends', function(){

        it('should return friends list', function(done){
           done();
        });
    });

    describe('scenario', function(){

        describe('user a ask b as friend, b accept', function(){

            it('should create a request from a to b', function(done){
                done();
            });

            it('should accept request from a', function(done){
                done();
            });

            it('a should be able to retrieve b as friend', function(done){
                done();
            });
        });

    });

});