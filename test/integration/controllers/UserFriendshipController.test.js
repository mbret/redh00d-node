var request = require('supertest');
var assert = require("assert");

describe('UserFriendshipController', function() {

    var app;
    var user;

    before(function(done){
        app = sails.hooks.http.app;
        user = sails.config.test.user;
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

    /**
     * Get a list of user friends
     */
    describe("GET /userid/friends", function(){

        it('should respond bad request', function(done){
            request(app).get('/users/x/friends').set('Authorization', sails.config.test.userAuth)
                .expect(400).end(done);
        });

        it('should respond a list of friends', function(done){
            request(app).get('/users/' + user.id + '/friends').set('Authorization', sails.config.test.userAuth)
                .expect(200)
                .expect(function(res){
                    res.body.should.not.be.empty;
                    res.body[0].should.have.property('email');
                })
                .end(done);
        });

    });

});