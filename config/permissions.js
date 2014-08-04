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
        allow: {
            guest: {
                user: [ 'create' ]
            },
            user: {

            },
            admin: {

            }
        },
        deny: {}
    }
};
