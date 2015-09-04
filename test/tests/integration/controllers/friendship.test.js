'use strict';

var request = require('supertest');
var assert = require("assert");
var should  = require('chai').should();
var expect = require('chai').expect;

describe('integration.controllers.friendship', function() {

    var app;
    
    before(function(done){
        app = sails.hooks.http.app;
        done();
    });

    describe('post', function(){

    });
});