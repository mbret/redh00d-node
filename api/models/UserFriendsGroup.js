/**
 * UserFriendshipGroup
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    tableName: 'user_friend_group',

    attributes: {

        id: {
          type: 'integer',
          autoIncrement: true,
          unique: true,
          index: true,
          primaryKey: true,
          columnName: 'userFriendGroupID'
        },
        user: {
            model: 'User',
            columnName: 'FK_applicantUserID',
            required: true,
            index: true
        },
        name: {
            type: 'string',
            required: true,
            columnName: 'userFriendGroupName'
        },
    
    }

};
