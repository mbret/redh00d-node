var request = require('supertest');
var assert = require("assert");
//var should = require("should");

describe('isAllowedPolicies', function() {

    // Overwrite application permissions with test data
    var permisssions = {
        roles: {
            guest: {
                parent: null
            },
            user: {
                parent: 'guest'
            },
            admin: {
                parent: 'user'
            }
        },
        resources: [ 'r1', 'r2', 'r3' ],
        acl: {
            guest: {
                allow: {
                    r1: ['a1']
                }
            },
            user: {
                allow: {
                    r1: ['find','findmultiple','delete','deleteOthers']
                },
                deny: {
                    r1: ['a1', 'a10']
                }
            },
            admin: {
                allow: {
                    r1: ['a10']
                }
            }
        }
    };

    before(function(done){
        sails.config.permissions = permisssions;
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

    describe("Allowed", function(){
        it('should be allowed', function(){
            assert.equal(PermissionsService.isAllowed('guest', 'r1', 'a1'), true);
            assert.equal(PermissionsService.isAllowed('admin', 'r1', 'a10'), true);
        })
    });

    describe("Forbidden", function(){
        it('should be deny', function(){
            assert.equal(PermissionsService.isAllowed('guest', 'r1', 'a2'), false);
            assert.equal(PermissionsService.isAllowed('user', 'r1', 'a1'), false);
            assert.equal(PermissionsService.isAllowed('admin', 'r1', 'a1'), false); // even if guest is allow for r1->a1 admin does not because of user
        })

        it('should throw an exception', function(){
            // Existence of data
            assert.throws(function(){ PermissionsService.isAllowed('admin', 'r5', 'a1') } , Error); // resource r5 doesnt exist
            assert.throws(function(){ PermissionsService.isAllowed('admin', 'user', 'a50') }, Error); // action a50 doesnt exist
            assert.throws(function(){ PermissionsService.isAllowed('toto', 'user', 'a1') }, Error); // toto doesnt exist
        })
    })

});