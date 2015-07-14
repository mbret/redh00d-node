/**
 * UserFriendshipGroup
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    tableName: 'user_friend_group_member',

    attributes: {

        id: {
            type: 'integer',
            autoIncrement: true,
            unique: true,
            index: true,
            primaryKey: true,
            columnName: 'userFriendGroupMemberID'
        },
        group: {
            model: 'UserFriendsGroup',
            columnName: 'FK_applicantUserID',
            required: true,
            index: true
        },
        user: {
            model: 'User',
            columnName: 'FK_targetUserID',
            required: true,
            index: true
        },
    
    }

};
