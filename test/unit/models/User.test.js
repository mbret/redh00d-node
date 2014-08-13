var assert = require("assert");

describe.only('UserModel', function() {

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

        it ('should create a Foo record', function () {
            Foo.create({
                nickname: "My Name"
            }).done(function (err, foo) {} )
        }),

        it ('should have exactly one record', function () {
            Foo.count(function (err, cnt) {
                assert.equal(cnt, 1)
            })
        }),

        it ('should be named "My name"', function () {
            Foo.find().limit(1).done(function (err, foo) {
                assert.equal(foo[0].nickname, "My Name")
            })
        })

    })

    describe('#find()', function() {
        it('should check find function', function (done) {
            User.find().then(function(results) {
                // some tests
//                assert.equal(null, results);
                done();
            }).fail(done);
        });
    })

    describe('#save()', function(){
        it('should save without error', function(done){
            var user = {};
            return done();
            return User.save( user ); //  callback accepts an error, so we may use this directly:
        })
    })

});