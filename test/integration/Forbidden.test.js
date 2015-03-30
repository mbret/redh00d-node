var request = require('supertest');
var agent;
var app;

describe('ForbiddenIntegration', function() {

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    after(function(done) {
        done();
    });

    // @todo


});