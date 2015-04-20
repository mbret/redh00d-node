var request = require('supertest');
var assert = require("assert");
//var should = require("should");

describe('PermissionsService', function() {

    describe("Allowed", function(){
        it('should be allowed', function(){
            assert.equal(PermissionsService.isAllowed('guest', 'user', 'create'), true);
            assert.equal(PermissionsService.isAllowed('user', 'user', 'find'), true);
            assert.equal(PermissionsService.isAllowed('admin', 'user', 'create'), true);
        });

        it('should be allowed thanks to parents fallback', function(){
            assert.equal(PermissionsService.isAllowed('user', 'user', 'foo'), true);
            assert.equal(PermissionsService.isAllowed('admin', 'user', 'foo'), true);
        });
    });

    describe("Forbidden", function(){
        it('should deny for various role/resource/action', function(){
            assert.equal(PermissionsService.isAllowed('guest', 'user', 'deleteOthers'), false);
            assert.equal(PermissionsService.isAllowed('user', 'user', 'deleteOthers'), false);
            assert.equal(PermissionsService.isAllowed('admin', 'user', 'bar'), false);
        });

        it('should deny because these resources does\'nt exist', function(){
            // Existence of data
            assert.equal(PermissionsService.isAllowed('admin', 'r5', 'a1') , false); // resource r5 doesnt exist
        });

        it('should deny because these action does\'nt exist', function(){
            // Existence of data
            assert.equal(PermissionsService.isAllowed('admin', 'user', 'a50'), false); // action a50 doesnt exist
        });

        it('should deny because these role does\'nt exist', function(){
            // Existence of data
            assert.equal(PermissionsService.isAllowed('toto', 'user', 'a1'), false); // toto doesnt exist
        });
    })

});