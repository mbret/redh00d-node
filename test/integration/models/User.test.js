var assert = require("assert");

describe('UserModel', function() {

    var defaultUserRole;

    before(function(done){
        UserRole.findDefault()
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
            User.create({
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
                    || user.apiKey.length < 1
                    || user.role != defaultUserRole.ID // default role
                    ){
                    throw new Error('User malformed or incomplete');
                }
                done();
            });
        });

    });



});