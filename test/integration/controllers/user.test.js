var request = require('supertest');
var async = require('async');
var assert = require("assert");

describe('integration.controllers.user', function() {

    // Contain normal users
    var users;
    // Contain admin users
    var usersAdmin;
    // Contain all users
    var allUsers;
    // unique user which is always recreated beforeEach
    var testUser = {
        model: null,
        authorization: "Basic dGVzdEB0ZXN0LmNvbTpwYXNzd29yZA==" // test@test.com / password
    };
    var app;

    before(function(done){
        app = sails.hooks.http.app;

        return Promise.all([])
            // create list of users
            .then(function(){
                return Promise
                    .all([
                        sails.models.user.create({email: 'user2@user2.com', firstName: 'User', lastName: 'User'}),
                        sails.models.user.create({email: 'user3@user3.com', firstName: 'Darin', lastName: 'Manikkam'}),
                    ])
                    .then(function(results){
                        users = results;
                        testUser.model = results[2];
                    });
            })
            // get admin role id
            .then(function(){
                return sails.models.userrole.findOne({name: 'admin'});
            })
            // store admin users
            .then(function(adminRole){
                return sails.models.user.find({role: adminRole.id}).populate('role').then(function(entries){
                    usersAdmin = entries;
                    return adminRole;
                });
            })
            // Store other users
            .then(function(adminRole){
                return sails.models.user.find({ role: { '!': adminRole.id }}).populate('role').then(function(entries){
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
    beforeEach(function(cb){
        // Create a unique test user (destroy and recreate it each time)
        // This user can be manipulate for each describe and is always the same at the start.
        sails.models.user.create({email: 'test@test.com', firstName: 'test', lastName: 'test'})
            .then(function(user){
                testUser.model = user;
            })
            .then(function(){
                // create its passport
                return sails.models.userpassport.create({protocol: 'local', password: 'password', user: testUser.model.id});
            })
            .then(cb.bind(this, null))
            .catch(cb);
    });

    after(function(done){
        done();
    });

    afterEach(function(cb){
        // destroy test user
        sails.models.user.destroy(testUser.model.id)
            .then(cb.bind(this, null))
            .catch(cb);
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

        it('should respond 400', function(done){
            async.series([
                function(callback){
                    request(sails.hooks.http.app).get('/users/x').set('Accept', 'application/json').set('Authorization', sails.config.test.userAuth)
                        .expect(400).end(callback);
                },
            ], function(err, results){
                if(err) return done(err);
                done();
            });
        });

        it('should respond 404', function(done){
            async.series([
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
            request(app).post('/users').set('Authorization', sails.config.test.adminAuth)
                .expect(400).end(done);
        });

        it('should create the user with email email@email.com', function(done){
            request(app).post('/users').send({email: 'email@email.com', firstName: 'Maxime', lastName: 'Bret'}).set('Authorization', sails.config.test.adminAuth)
                .expect(201).expect(function(res){
                    if( !res.body.user || res.body.user.email != 'email@email.com' ) throw new Error("User not created");
                })
                .end(done);
        });

    });

    describe("PUT /users", function(){

        it('should update a user as admin', function(done){
            request(app).put('/users/' + users[0].id).set('Authorization', sails.config.test.adminAuth)
                .expect(200).end(done);
        });

        it('should update the firstname of account for its specific user', function(done){
            request(app).put('/users/' + testUser.model.id).send({firstname: 'barbapapa'}).set('Authorization', testUser.authorization)
                .expect(200).expect(function(res){
                    if( !res.body.user || res.body.user.firstName != 'barbapapa' ) throw new Error("User not updated correctly");
                }).end(done);
        });

        // User with email xmax54@gmail.com id:1 should not be able to update another user
        it('should not be able to delete another user as user', function(done){
            request(app).put('/users/' + users[1].id).set('Authorization', sails.config.test.userAuth)
                .expect(403).end(done);
        });

        // User does not exist
        it('should get 404', function(done){
            request(app).put('/users/9999999').set('Authorization', sails.config.test.adminAuth)
                .expect(404).end(done);
        });
    });

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
        //            return sails.models.user.findOne(testUser.id).exec(function(err, user){
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
            request(sails.hooks.http.app).del('/users/' + testUser.model.id).set('Authorization', sails.config.test.userAuth)
                .expect(403).end(done);
        });

        // User does not exist
        it('should get 404', function(done){
            request(sails.hooks.http.app).del('/users/9999999').set('Authorization', sails.config.test.adminAuth)
                .expect(404).end(done);
        });
        
        it('should delete the user test as admin', function(done){
            request(sails.hooks.http.app).del('/users/' + testUser.model.id).set('Authorization', sails.config.test.adminAuth)
                .expect(204).end(done);
        });
        
    })

});