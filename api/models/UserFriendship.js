/**
 * UserFriendship
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

// use this method https://groups.google.com/forum/#!topic/sailsjs/GTGoOGHAEvE to emulate inheritance of object
// The base model is cloned and then merged with this model. This model is a child of the clone so not a child of ./BaseModel itself
module.exports = _.merge( _.cloneDeep( require('./BaseModel') ), {

    attributes: {
        id: {
            type: 'integer'
        },
        fromUser: {
            model: 'user',
            columnName: 'FK_fromUserID',
            required: true
        },
        toUser: {
            model: 'user',
            columnName: 'FK_toUserID',
            required: true
        },
        status: {
            type: 'string',
            enum: ['pending', 'friend', 'blocked']
        }
    }

});
