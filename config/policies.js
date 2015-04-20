/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

    // Default policy for all controllers and actions
    // (`true` allows public access)
    '*': [
        'basicAuth', // always check basic auth first
        'jwtAuth',
        'isAuth', // IMPORTANT, this last check ensure that user will not pass through authentication method

        // Check for permission
        // We are not using several policies here because it's better to delegate permission to extern service
        // It's more portable and can be share through a database and be manageable for example.
        'isAuthorized',
    ],
    
    AuthController: {
        login: true,
        register: true,
        provider: true,
        facebookCallback: true
    },

    HelperController: false

};
