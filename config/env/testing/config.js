module.exports = {

    // Predefined data that can be used with tests
    testData: {
        userCredentials: {
            email: 'user@user.com',
            password: 'password'
        },
        userAuthorization: "Basic dXNlckB1c2VyLmNvbTpwYXNzd29yZA==", // user@user.com / password
        adminAuthorization: 'Basic YWRtaW5AYWRtaW4uY29tOnBhc3N3b3Jk', // admin@admin.com / password
    },

    test: {
        user: null,
        admin: null,
        userPassword: 'password',
        userAuth: "Basic dXNlckB1c2VyLmNvbTpwYXNzd29yZA==", // user@user.com / password
        adminAuth: 'Basic YWRtaW5AYWRtaW4uY29tOnBhc3N3b3Jk', // admin@admin.com / password
        toolsPath: __dirname + '/tools'
    }

};