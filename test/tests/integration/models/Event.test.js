var assert = require("assert");
var chai = require('chai');
chai.use(require('chai-datetime'));
var should  = chai.should();
var expect = chai.expect;

describe('integration.models.event', function() {

    var Event = null;
    // var ...
    var baseEventData = {
        author: 1,
        name: "Event for test",
        description: "Join us !",
        place: "Toul",
        date: new Date()
    };

    before(function(done){
        Event = sails.models.event;
        done();
    });

    describe('create', function () {

        var event = {
            id: null,
            author: 1,
            title: '$64$64$4$68$',
            description: "$64$64$4$68$",
            location: "864$",
            date: new Date()
        };

        afterEach(function(done){
            // remove created user
            sails.models.event
                .destroy(event.id)
                .then(function(destroyed){
                    done();
                })
                .catch(done);
        });

        it ('should create an event', function (done) {
            sails.models.event.create(event)
                .then(function(data){
                    expect(data).to.be.a('object');
                    expect(data).to.include.keys('id', 'title', 'author', 'description', 'location', 'date', 'otherMayBring', 'createdAt', 'updatedAt', 'picture');
                    data.title.should.equal(event.title);
                    data.description.should.equal(event.description);
                    data.author.should.equal(event.author);
                    data.location.should.equal(event.location);
                    expect(data.date).to.be.a('date');
                    expect(data.createdAt).to.be.a('date');
                    expect(data.updatedAt).to.be.a('date');
                    data.date.should.equalDate(event.date);

                    event.id = data.id;
                    return done();
                })
                .catch(done);
        });

    });

});