/**
 * UserFriendshipGroup
 *
 *
 */

module.exports = {

    tableName: 'user_friend_group',
    identity: 'userfriendgroup',

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
            model: 'user',
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
