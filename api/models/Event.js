/**
 * Event
 *
 * Here is the database table structure:
 *  ------------------------------------------------------
 * | eventID | eventStatus | FK_userID | FK_userTargetID |
 * ------------------------------------------------------
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        ID: {
            type: 'integer'
        },
        status: {

        },
        userID: {

        },
        targetUserID: {

        }
    }

};
