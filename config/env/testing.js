/**
 * Created by mbret on 10/04/2015.
 */
module.exports = {

    // configuration for testing purposes
    log:{
        level: "error"
    },

    fillDb: true,
    autoLogon: false,

    models: {
        migrate: 'drop' // erase database before each launch
    },

    general: {
        initDatabase: false
    },

    test: {
        user: null,
        admin: null,
        userPassword: 'password',
        userAuth: "Basic dXNlckB1c2VyLmNvbTpwYXNzd29yZA==", // user@user.com / password
        adminAuth: 'Basic YWRtaW5AYWRtaW4uY29tOnBhc3N3b3Jk', // admin@admin.com / password
        toolsPath: __dirname + '/tools'
    }
}