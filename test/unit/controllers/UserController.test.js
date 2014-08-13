var request = require('supertest');

describe('UserController', function() {

    // var ...

    before(function(done){
        done();
    })

    beforeEach(function(done){
        done();
    })

    after(function(done){
        done();
    })

    afterEach(function(done){
        done();
    })

    describe("GET /users", function(){
        it('should respond with json', function(done){
            request(sails.hooks.http.app)
                .get('/users')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        })

        it('should return list of json users', function(done){
            // ...
            done();
        })
    })

    describe("DELETE /users", function(){

        it('should delete the specified user', function(done){
            // ...
            done();
        })

        it('should block access to delete this user', function(done){
            // ...
            done();
        })
    })

});