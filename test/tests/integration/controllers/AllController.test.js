var request = require('supertest');

describe('AllController', function() {

    var authorization = "Basic dXNlckB1c2VyLmNvbTpwYXNzd29yZA=="; // xmax54@gmail.com / password
    var authorizationAdmin = 'Basic YWRtaW5AYWRtaW4uY29tOnBhc3N3b3Jk'; // admin@admin.com / password
//    var request = request(sails.hooks.http.app);

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

    describe("All", function(){

        it('should respond with json', function(done){
            async.series([
                function(callback){
                    request(sails.hooks.http.app).get('/users/1').set('Accept', 'application/json').set('Authorization', authorization)
                        .expect('Content-Type', /json/).end(callback);
                },
                function(callback){
                    request(sails.hooks.http.app).get('/users').set('Accept', 'application/json').set('Authorization', authorization)
                        .expect('Content-Type', /json/).end(callback);
                },
                function(callback){
                    request(sails.hooks.http.app).post('/users').set('Accept', 'application/json').set('Authorization', authorization)
                        .expect('Content-Type', /json/).end(callback);
                },
//                function(callback){
//                    request(sails.hooks.http.app).del('/users/10').set('Accept', 'application/json').set('Authorization', authorization)
//                        .expect('Content-Type', /json/).end(callback);
//                },
            ], function(err, results){
                if(err) return done(err);
                done();
            });
        });

    });


});