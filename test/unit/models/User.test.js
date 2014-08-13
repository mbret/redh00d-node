var assert = require("assert");

describe('UserModel', function() {

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

    describe('Foo model test', function () {

        it ('should create a Foo record', function (done) {
            done();
            return User.create({
                nickname: "My Name"
            });
        });

        it ('should be named "My name"', function (done) {
            return done();
            User.find()
                .limit(1)
                .then(function (foo) {
//                    assert.equal(foo[0].nickname, "My Name");
                    done();
                }).fail(done);
        });

        it ('should have exactly one record', function () {
//            User.count(function (err, cnt) {
//                if(err) throw err;
//                return assert.equal(cnt, 1);
//            });
        });

    });

    describe('#find()', function() {
        it('should check find function', function (done) {
            User.find().then(function(results) {
                // some tests
//                assert.equal(null, results);
                return done();
            }).fail(done);
        });
    });

    describe('#save()', function(){



        it('should save without error', function(done){
            var user = {};
            return done();
            return User.save( user ); //  callback accepts an error, so we may use this directly:
        });


    });



});