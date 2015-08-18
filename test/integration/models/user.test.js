var assert = require("assert");

describe('integration.models.user', function() {

    var defaultUserRole;

    before(function(done){
        sails.models.userrole.findDefault()
            .then(function(role){
                defaultUserRole = role;
                done();
            })
            .catch(done);
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

    describe('Create test', function () {

        it ('should create a correct minimal user record', function (done) {
            sails.models.user.create({
                firstName: "Toto",
                lastName: "Tata",
                email: "toto@tata.com",
                password: "password"
            }).exec(function(err, user){
                if(err) throw new Error(err);
                if(!user) throw new Error('User not created');
                if(user.firstName != "Toto"
                    || user.lastName != 'Tata'
                    || user.email != 'toto@tata.com'
                    || ! user.createdAt instanceof Date
                    || ! user.updatedAt instanceof Date
                    || user.role != defaultUserRole.id // default role
                    ){
                    throw new Error('User malformed or incomplete');
                }
                done();
            });
        });

    });

    describe('destroy', function(){

        var testUser;

        before(function(done){
            sails.models.user.create({email: 'test@test.com', firstName: 'test', lastName: 'test'})
                .then(function(user){
                    testUser = user;
                    return sails.models.userpassport.create({protocol: 'local', user: testUser.id, password: 'password'});
                })
                .then(done.bind(this, null))
                .catch(done);
        });

        after(function(done){
            // clean test user
            sails.models.user.destroy(testUser.id)
                .then(done.bind(this, null))
                .catch(done);
        });

        it('should destroy the user passports', function(done){
            // destroy
           sails.models.user.destroy(testUser.id)
               .then(function(){
                   // verify that no passport exists
                   return sails.models.userpassport.find({user: testUser.id})
                       .then(function(passports){
                           passports.should.be.empty;
                           done();
                       });
               })
               .catch(done);
        });
    });


});