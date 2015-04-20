/**
 *
 */

var permissions = {

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
        'helper' // HelperController
    ],

    // ACL must use correct roles and resources as defined above
    acl: {
        guest: {
            allow: {
                user: ['create', 'foo']
            }
        },
        user: {
            allow: {
                user: ['find','findmultiple','delete', 'update', 'patch', 'generateResetPasswordToken'],
                event: ['find', 'findmultiple', 'create'],
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
                user: ['create', 'deleteOthers', 'updateOthers', 'patchOthers']
            }
        }
    }

};

module.exports.permissions = permissions;
