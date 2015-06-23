var request = require('supertest');
var async = require('async');
var assert = require("assert");

describe('UserController', function() {

    var users;
    var usersAdmin;
    var allUsers;
    var testUser; // unique user which is always recreated beforeEach
    
    before(function(done){
        // get admin role
        UserRole.findOne({name: 'admin'})
            .then(function(role){
                return User.find({role: role.id}).populate('role').then(function(entries){
                    usersAdmin = entries;
                    return role;
                });
            })
            .then(function(role){
                return User.find({ role: { '!': role.id }}).populate('role').then(function(entries){
                    users = entries;
                });
            })
            .then(function(){
                allUsers = usersAdmin.concat(users);
                done();
            })
            .catch(done);
    });

    /**
     * - Create a unique test user (destroy and recreate it each time)
     *   This user can be manipulate for each describe and is always the same at the start.
     */
    beforeEach(function(done){
        async.series([
            // clear user
            function(cb){
                if(testUser && testUser.id){
                    User.destroy(testUser.id)
                        .then(function(){ cb() })
                        .catch(cb);
                }
                else{
                    return cb();
                }
            },
            // recreate
            function(cb){
                User.create({email: 'test@test.com', password: 'test', firstName: 'test', lastName: 'test'})
                    .then(function(user){
                        testUser = user;
                        cb();
                    }).catch(cb);
            }
        ], done);
    });

    after(function(done){
        done();
    });

    afterEach(function(done){
        done();
    });

    describe("GET /users", function(){

        it('should respond user with id x', function(done){
            request(sails.hooks.http.app).get('/users/' + users[0].id).set('Accept', 'application/json').set('Authorization', sails.config.test.userAuth)
                .expect(function(res){
                    res.body.should.not.be.empty;
                    res.body.should.have.property('id');
                    assert.equal(res.body.id, users[0].id);
                })
                .end(done);
        });

        it('should respond 404', function(done){
            async.series([
                function(callback){
                    request(sails.hooks.http.app).get('/users/x').set('Accept', 'application/json').set('Authorization', sails.config.test.userAuth)
                        .expect(404).end(callback);
                },
                function(callback){
                    request(sails.hooks.http.app).get('/users/20').set('Accept', 'application/json').set('Authorization', sails.config.test.userAuth)
                        .expect(404).end(callback);
                }
            ], function(err, results){
                if(err) return done(err);
                done();
            });
        });

        it('should respond list of users', function(done){
            request(sails.hooks.http.app).get('/users').set('Accept', 'application/json').set('Authorization', sails.config.test.userAuth)
                .expect(function(res){
                    if( !res.body.users ) throw new Error("No users");
                })
                .end(done);
        })

    });

    describe("POST /users", function(){

        it('should respond Bad Request', function(done){
            request(sails.hooks.http.app).post('/users').set('Authorization', sails.config.test.adminAuth)
                .expect(400).end(done);
        });

        it('should create the user with email email@email.com', function(done){
            request(sails.hooks.http.app).post('/users').send({email: 'email@email.com', firstName: 'Maxime', lastName: 'Bret'}).set('Authorization', sails.config.test.adminAuth)
                .expect(201).expect(function(res){
                    if( !res.body.user || res.body.user.email != 'email@email.com' ) throw new Error("User not created");
                })
                .end(done);
        });

    });

    describe("PUT /users", function(){

        it('should update a user as admin', function(done){
            request(sails.hooks.http.app).put('/users/' + users[0].id).set('Authorization', sails.config.test.adminAuth)
                .expect(200).end(done);
        });

        it('should update the firstname of account for its specific user', function(done){
            request(sails.hooks.http.app).put('/users/' + users[0].id).send({firstname: 'barbapapa'}).set('Authorization', sails.config.test.userAuth)
                .expect(200).expect(function(res){
                    if( !res.body.user || res.body.user.firstName != 'barbapapa' ) throw new Error("User not updated correctly");
                }).end(done);
        });

        // User with email xmax54@gmail.com id:1 should not be able to update another user
        it('should not be able to delete another user as user', function(done){
            request(sails.hooks.http.app).put('/users/' + users[1].id).set('Authorization', sails.config.test.userAuth)
                .expect(403).end(done);
        });

        // User does not exist
        it('should get 404', function(done){
            request(sails.hooks.http.app).put('/users/9999999').set('Authorization', sails.config.test.adminAuth)
                .expect(404).end(done);
        });
    })

    describe("PATCH /users", function(){

        // User with email xmax54@gmail.com id:1 should not be able to patch another user
        it('should not be able to patch another user as user', function(done){
            request(sails.hooks.http.app).patch('/users/user2@user.com').set('Authorization', sails.config.test.userAuth)
                .expect(403).end(done);
        });

        // User does not exist
        it('should get 404', function(done){
            request(sails.hooks.http.app).patch('/users/user50@user.com').set('Authorization', sails.config.test.adminAuth)
                .expect(404).end(done);
        });

        /*
         * Reset password
         */
        //it('should generate unique token password reset for specific user', function(done){
        //    request(sails.hooks.http.app).patch('/users/' + testUser.id).set('Authorization', sails.config.test.adminAuth).send({reset_password: true, silent: true})
        //        .expect(204)
        //        .expect(function(res){
        //            return User.findOne(testUser.id).exec(function(err, user){
        //                if(!user.passwordResetToken || user.passwordResetToken.value.length <= 0){
        //                    throw new Error("Token not generated");
        //                }
        //            });
        //        })
        //        .end(done);
        //});
    });

    describe("DELETE /users", function(){

        it('should not be able to delete itself as user (forbidden)', function(done){
            request(sails.hooks.http.app).del('/users/' + sails.config.test.user.id).set('Authorization', sails.config.test.userAuth)
                .expect(403).end(done);
        });

        it('should not be able to delete itself as admin (bad request)', function(done){
            request(sails.hooks.http.app).del('/users/' + sails.config.test.admin.id).set('Authorization', sails.config.test.adminAuth)
                .expect(400).end(done);
        });
        
        // User with email xmax54@gmail.com id:1 should not be able to delete another user
        it('should not be able to delete another user as user', function(done){
            request(sails.hooks.http.app).del('/users/' + testUser.id).set('Authorization', sails.config.test.userAuth)
                .expect(403).end(done);
        });

        // User does not exist
        it('should get 404', function(done){
            request(sails.hooks.http.app).del('/users/9999999').set('Authorization', sails.config.test.adminAuth)
                .expect(404).end(done);
        });
        
        it('should delete the user test as admin', function(done){
            request(sails.hooks.http.app).del('/users/' + testUser.id).set('Authorization', sails.config.test.adminAuth)
                .expect(204).end(done);
        });
        
    })

});