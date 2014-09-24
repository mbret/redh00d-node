var request = require('supertest');

describe('UserController', function() {

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

    describe("GET /users", function(){

        it('should respond user with ID 1', function(done){
            request(sails.hooks.http.app).get('/api/users/1').set('Accept', 'application/json').set('Authorization', authorization)
                .expect(function(res){
                    if( !res.body.user || !res.body.user.ID == 1 ) throw new Error("No user or wrong user");
                })
                .end(done);
        });

        it('should respond 404', function(done){
            async.series([
                function(callback){
                    request(sails.hooks.http.app).get('/api/users/x').set('Accept', 'application/json').set('Authorization', authorization)
                        .expect(404).end(callback);
                },
                function(callback){
                    request(sails.hooks.http.app).get('/api/users/20').set('Accept', 'application/json').set('Authorization', authorization)
                        .expect(404).end(callback);
                }
            ], function(err, results){
                if(err) return done(err);
                done();
            });
        });

        it('should respond list of users', function(done){
            request(sails.hooks.http.app).get('/api/users').set('Accept', 'application/json').set('Authorization', authorization)
                .expect(function(res){
                    if( !res.body.users ) throw new Error("No users");
                })
                .end(done);
        })

    });

    describe("POST /users", function(){

        it('should respond Bad Request', function(done){
            async.series([
                function(callback){
                    request(sails.hooks.http.app).post('/api/users')
                        .expect(400).end(callback);
                },
                function(callback){
                    request(sails.hooks.http.app).post('/api/users').send({email: 'email@email.com'})
                        .expect(400).end(callback);
                },
            ], function(err, results){
                if(err) return done(err);
                done();
            });
        });

        it('should create the user with email email@email.com', function(done){
            request(sails.hooks.http.app).post('/api/users').send({email: 'email@email.com', password: 'password', firstname: 'Maxime', lastname: 'Bret'})
                .expect(201).expect(function(res){
                    if( !res.body.user || res.body.user.email != 'email@email.com' ) throw new Error("User not created");
                })
                .end(done);
        });

    })

    describe("PUT /users", function(){

        it('should update the user with ID 3 as admin', function(done){
            request(sails.hooks.http.app).put('/api/users/3').set('Authorization', authorizationAdmin)
                .expect(200).end(done);
        });

        it('should update the firstname of account for its specific user', function(done){
            request(sails.hooks.http.app).put('/api/users/2').send({firstname: 'barbapapa'}).set('Authorization', authorization)
                .expect(200).expect(function(res){
                    if( !res.body.user || res.body.user.firstName != 'barbapapa' ) throw new Error("User not updated correctly");
                }).end(done);
        });

        // User with email xmax54@gmail.com ID:1 should not be able to update another user
        it('should not be able to delete another user as user', function(done){
            request(sails.hooks.http.app).put('/api/users/3').set('Authorization', authorization)
                .expect(403).end(done);
        });

        // User does not exist
        it('should get 404', function(done){
            request(sails.hooks.http.app).put('/api/users/10').set('Authorization', authorizationAdmin)
                .expect(404).end(done);
        });
    })

    describe("PATCH /users", function(){

        // User with email xmax54@gmail.com ID:1 should not be able to patch another user
        it('should not be able to patch another user as user', function(done){
            request(sails.hooks.http.app).patch('/api/users/user2@user.com').set('Authorization', authorization)
                .expect(403).end(done);
        });

        // User does not exist
        it('should get 404', function(done){
            request(sails.hooks.http.app).patch('/api/users/user50@user.com').set('Authorization', authorizationAdmin)
                .expect(404).end(done);
        });

        /*
         * Reset password
         */
        it('should generate unique token (password) for user with ID 3', function(done){
            request(sails.hooks.http.app).patch('/api/users/xmax54@gmail.com').set('Authorization', authorizationAdmin).send({reset_password: true, silent: true})
                .expect(204)
                .expect(function(res){
                    return User.findOne({email: 'xmax54@gmail.com'}).exec(function(err, user){
                        if(!user.passwordResetToken || user.passwordResetToken.value.length <= 0){
                            throw new Error("Token not generated");
                        }
                    });
                })
                .end(done);
        });
    })

    describe("DELETE /users", function(){

        it('should delete the user with ID 3 as admin', function(done){
            request(sails.hooks.http.app).del('/api/users/3').set('Authorization', authorizationAdmin)
                    .expect(204).end(done);
        });

        // User with email xmax54@gmail.com ID:1 should not be able to delete another user
        it('should not be able to delete another user as user', function(done){
            request(sails.hooks.http.app).del('/api/users/3').set('Authorization', authorization)
                .expect(403).end(done);
        });

        // User does not exist
        it('should get 404', function(done){
            request(sails.hooks.http.app).del('/api/users/10').set('Authorization', authorizationAdmin)
                .expect(404).end(done);
        });
    })

});