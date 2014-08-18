var request = require('supertest');

describe('UserController', function() {

    var authorization = "Basic dXNlckB1c2VyLmNvbTpwYXNzd29yZA=="; // user@user.com / password

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

        it('should respond one user', function(done){
            request(sails.hooks.http.app)
                .get('/api/users/1').set('Accept', 'application/json').set('Authorization', authorization)
                .expect('Content-Type', /json/)
                .expect(function(res){
                    if( !res.body.user ) throw new Error("No user");
                })
                .end(done);
        });

        it('should respond 404', function(done){
            request(sails.hooks.http.app)
                .get('/api/users/x').set('Accept', 'application/json').set('Authorization', authorization)
                .expect('Content-Type', /json/)
                .expect(404)
                .end(done);
        });

        it('should respond list of users', function(done){
            request(sails.hooks.http.app)
                .get('/api/users').set('Accept', 'application/json').set('Authorization', authorization)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function(res){
                    if( !res.body.users ) throw new Error("No users");
                })
                .end(done);
        })


    })

    describe("DELETE /users", function(){

        it('should delete the user with ID 1', function(done){
            // ...
            done();
        });

        it('should not be allowed to delete other account', function(done){
            // ...
            done();
        });

        it('should be allowed to delete other account', function(done){
            // ...
            done();
        });
    })

});