/**
 *
 */


module.exports.permissions = {

    roles: {
        guest: {
            parent: null
        },

        user: {
            parent: 'guest'
        },

        admin: {
            parent: 'guest'
        }
    },


    resources: {
        user: {
            controller: 'UserController'
        }
    },


    acl: {
        guest: {
            allow: {
                user: ['create']
            }
        },
        user: {
            allow: {
                user: ['find']
            },
            deny: {
                user: ['create']
            }
        },
        admin: {

        }
    }
};
