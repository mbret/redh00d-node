'use strict';

var randomstring = require("randomstring");

class TestHelper{

    /**
     * Create a simple random user
     * @returns Promise
     */
    createSimpleUser(){
        return sails.models.user.create({
            firstName: randomstring.generate(),
            lastName: randomstring.generate(),
            email: randomstring.generate() + "@gmail.com",
            password: randomstring.generate()
        });
    }
}

module.exports = new TestHelper();