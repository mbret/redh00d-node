/**
 *
 */
module.exports = {

    /**
     *
     * @param roleName
     * @param controllerName
     * @param actionName
     * @returns {boolean}
     */
    isAllowed: function( roleName, resource, action ){
        // `sails` object is available here:

        var permissions = sails.config.permissions;
        // Reject if ACL is not register for this resource
        if( ! this._hasRole(roleName) || ! this._hasResource(resource)  ){
            throw new Error("Permission policy, trying to get a unknown role or resource or action [role="+roleName+"][resource="+resource+"][action="+action+"]");
        }

        // Loop over hierarchy. We check the lower level and if the acl is not satisfied we check then the parents
        // ex: user has some rights but doesn't overwrite the rights of his parent, guest. So we check users rights and then guest rights.
        // Deny is prior to allow and is check before
        var currentRole = roleName;
        var rightFound = null;
        var isAllowed = false;

        // Continue while hierarchy is not over or access is not explicitly denied!
        while( currentRole && rightFound !== true ){

            var acl = permissions.acl[currentRole];
            // Check if this current role is denied
            if( acl.deny && acl.deny[resource] && acl.deny[resource].indexOf(action) > -1 ){
                rightFound = true;
                isAllowed = false;
                sails.log.info("Permission policy, Restrict access to [current role tested="+currentRole+"][resource="+resource+"][action="+action+"]");
            }
            // Otherwise check if this current role has rights
            else if( acl.allow && acl.allow[resource] && acl.allow[resource].indexOf(action) > -1 ){
                rightFound = true;
                isAllowed = true;
                sails.log.info("Permission policy, Allow access to [current role tested="+currentRole+"][resource="+resource+"][action="+action+"]");
            }

            currentRole = permissions.roles[currentRole].parent;
        }

        return isAllowed;
    },

    _hasResource: function( resource ){
        return sails.config.permissions.resources.indexOf(resource) < 0 ? false : true;
    },

    _hasRole: function( role ){
        return sails.config.permissions.roles[role] ? true : false;
    }

};

// `sails` is not available out here
// (it doesn't exist yet)