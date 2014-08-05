/**
 *
 */
var  _ = require("lodash");
exports.helper = {

    isAllowed: function( roleName, controllerName, actionName ){
        // `sails` object is available here:
        var permissions = sails.config.permissions;
        var objectRole = permissions.roles( role );

        // Loop over hierarchy
        var currentRole = objectRole;
        var hasRight = null;
        // Continue while hierarchy is not over or access is not explicitly denied!
        while( currentRole || hasRight !== false ){

            // Check if this current role is denied
            if( permissions.acl(currentRole).deny(resource)[action] ){
                hasRight = false;
            }
            // Otherwise check if this current role has rights
            else if( permissions.acl(currentRole).allow(resource)[action] ){
                hasRight = true;
            }

            currentRole = currentRole.parent;
        }

        // if hasRight is null then return always false because the policy is (what is not allowed is denied)
        return hasRight === null ? false : hasRight;
    }



};

// `sails` is not available out here
// (it doesn't exist yet)