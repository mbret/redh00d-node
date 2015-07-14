/**
 * UserFriendshipGroupMember
 *
 *
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
            model: 'UserFriendGroup',
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
