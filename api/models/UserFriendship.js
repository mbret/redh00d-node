/**
 * UserFriendship
 *
 * Example:
 *  User a and c ask b
 *      ->  [ a, b, requested ]
 *          [ c, b, requested ]
 *          [ b, a, pending ]
 *          [ b, c, pending ]
 *  User b accept a
 *      ->  [ a, b, requested ]
 *          [ b, a, accepted ]
 *  User a block b
 *      ->  [ a, b, blocked ]
 *          [ b, a, accepted ]
 *
 * Example query:
 *  User a want to see pending request made
 *      -> to a where status = pending
 *
 *  User b want to see pending request received
 *      -> from b where status = pending
 *
 *  User a want to retrieve all friends
 *      -> to a where status != pending and status != rejected
 *
 *  User a want to retrieve all friends he can interacts with
 *      -> to a where status != pending and status != rejected and status != blocked
 *
 *  User a want to block user b
 *      -> from a to b set status blocked
 *      -> from b to a
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
            required: true,
            enum: ['pending', 'blocked', 'requested', 'accepted', 'rejected']
        },
        //ToUserStatus: {
        //    type: 'string',
        //    required: true,
        //    enum: ['pending', 'blocked', 'requested', 'accepted', 'rejected']
        //}
    }

});
