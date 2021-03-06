/**
 *
 */

var permissions = {

    defaultRole: 'user',

    // They match the role inside database
    roles: [
        {
            name: 'guest'
        },
        {
            name: 'user',
            parent: 'guest'
        },
        {
            name: 'admin',
            parent: 'user'
        }
    ],

    // They match routes and controller. Ex: /users -> UserController is converted to "user" from req.options.controller
    resources: [
        'user', // UserController
        'event', // EventController
        'product', // ProductController
        'dev', // DevController
        'helper', // HelperController
        'friendship'
    ],

    // ACL must use correct roles and resources as defined above
    acl: {
        guest: {
            allow: {
                user: ['create']
            }
        },
        user: {
            allow: {
                user: ['find','findmultiple','delete', 'update', 'patch', 'generateResetPasswordToken'],
                event: ['find', 'findmultiple', 'create'],
                friendship: ['create', 'findfriends'],
                product: ['find','findmultiple','create'],
                dev:    ['auth'], // allow user to authenticate first time
                helper: ['me']
            },
            deny: {
                user: ['create']
            }
        },
        admin: {
            allow: {
                product: ['delete'],
                user: ['create', 'deleteOthers', 'updateOthers', 'patchOthers']
            }
        }
    }

};

module.exports.permissions = permissions;
