var request = require('supertest');

describe('EventController', function() {

    var authorization = "Basic eG1heDU0QGdtYWlsLmNvbTpwYXNzd29yZA=="; // xmax54@gmail.com / password
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

    describe("GET /events", function(){

        it('should respond event with ID 1', function(done){
            request(sails.hooks.http.app).get('/events/1').set('Authorization', authorization)
                .expect(function(res){
                    if( !res.body.event || !res.body.event.ID == 1 ) throw new Error("No event or wrong event");
                })
                .end(done);
        });

        it('should respond 404', function(done){
            async.series([
                function(callback){
                    request(sails.hooks.http.app).get('/events/x').set('Authorization', authorization)
                        .expect(404).end(callback);
                },
                function(callback){
                    request(sails.hooks.http.app).get('/events/20').set('Authorization', authorization)
                        .expect(404).end(callback);
                }
            ], function(err, results){
                if(err) return done(err);
                done();
            });
        });

        it('should respond list of events', function(done){
            request(sails.hooks.http.app).get('/events').set('Authorization', authorization)
                .expect(function(res){
                    if( !res.body.events || res.body.events.length < 1 ) throw new Error("No events whereas at least one should be present");
                })
                .end(done);
        })

    });

//    describe("POST /users", function(){
//
//        it('should respond Bad Request', function(done){
//            async.series([
//                function(callback){
//                    request(sails.hooks.http.app).post('/users')
//                        .expect(400).end(callback);
//                },
//                function(callback){
//                    request(sails.hooks.http.app).post('/users').send({email: 'email@email.com'})
//                        .expect(400).end(callback);
//                },
//            ], function(err, results){
//                if(err) return done(err);
//                done();
//            });
//        });
//
//        it('should create the user with email email@email.com', function(done){
//            request(sails.hooks.http.app).post('/users').send({email: 'email@email.com', password: 'password', firstname: 'Maxime', lastname: 'Bret'})
//                .expect(201).expect(function(res){
//                    if( !res.body.user || res.body.user.email != 'email@email.com' ) throw new Error("User not created");
//                })
//                .end(done);
//        });
//
//    })
//
//    describe("PUT /users", function(){
//
//        it('should update the user with ID 3 as admin', function(done){
//            request(sails.hooks.http.app).put('/users/3').set('Authorization', authorizationAdmin)
//                .expect(200).end(done);
//        });
//
//        it('should update the firstname of account for its specific user', function(done){
//            request(sails.hooks.http.app).put('/users/2').send({firstname: 'barbapapa'}).set('Authorization', authorization)
//                .expect(200).expect(function(res){
//                    if( !res.body.user || res.body.user.firstName != 'barbapapa' ) throw new Error("User not updated correctly");
//                }).end(done);
//        });
//
//        // User with email xmax54@gmail.com ID:1 should not be able to update another user
//        it('should not be able to delete another user as user', function(done){
//            request(sails.hooks.http.app).put('/users/3').set('Authorization', authorization)
//                .expect(403).end(done);
//        });
//
//        // User does not exist
//        it('should get 404', function(done){
//            request(sails.hooks.http.app).put('/users/10').set('Authorization', authorizationAdmin)
//                .expect(404).end(done);
//        });
//    })
//
//    describe("DELETE /users", function(){
//
//        it('should delete the user with ID 3 as admin', function(done){
//            request(sails.hooks.http.app).del('/users/3').set('Authorization', authorizationAdmin)
//                    .expect(204).end(done);
//        });
//
//        // User with email xmax54@gmail.com ID:1 should not be able to delete another user
//        it('should not be able to delete another user as user', function(done){
//            request(sails.hooks.http.app).del('/users/3').set('Authorization', authorization)
//                .expect(403).end(done);
//        });
//
//        // User does not exist
//        it('should get 404', function(done){
//            request(sails.hooks.http.app).del('/users/10').set('Authorization', authorizationAdmin)
//                .expect(404).end(done);
//        });
//    })

});