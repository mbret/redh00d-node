/**
 *
 */
var  _ = require("lodash");
module.exports = {

    /**
     *
     * @param roleName
     * @param controllerName
     * @param actionName
     * @returns {boolean}
     */
    isAllowed: function( roleName, controllerName, actionName ){
        // `sails` object is available here:

        var permissions = sails.config.permissions;
        var resource = controllerName.toLowerCase();
        var action = actionName.toLowerCase();

        // Reject if ACL is not register for this action/resource
        if( ! permissions.resources[resource] || ! permissions.resources[resource].indexOf(action) < 0 ){
            sails.log.debug("Permission policy, trying to get a unknown resource or action [resource="+resource+"][action="+action+"]");
            return false;
        }

        // Loop over hierarchy. We check the lower level and if the acl is not satisfied we check then the parents
        // ex: user has some rights but doesn't overwrite the rights of his parent, guest. So we check users rights and then guest rights.
        // Deny is prior to allow and is check before
        var currentRole = roleName;
        var rightFound = null;
        var isAllowed = false;

        // Continue while hierarchy is not over or access is not explicitly denied!
        while( currentRole || rightFound === false ){

            var acl = permissions.acl[currentRole];
            // Check if this current role is denied
            if( acl.deny && acl.deny[resource] && acl.deny[resource].indexOf(action) > -1 ){
                rightFound = true;
                isAllowed = false;
            }
            // Otherwise check if this current role has rights
            else if( acl.allow && acl.allow[resource] && acl.allow[resource].indexOf(action) > -1 ){
                rightFound = true;
                isAllowed = true;
            }

            currentRole = permissions.roles[currentRole].parent;
        }

        return isAllowed;
    },



    hasResource: function( resourceName ){
        return true;
    }
};

// `sails` is not available out here
// (it doesn't exist yet)