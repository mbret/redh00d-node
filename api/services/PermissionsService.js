/**
 *
 */
var PermissionService = {

    // Get reference to the config
    permissions: sails.config.permissions,

    /**
     * Check if a resource's action is allowed for the given role.
     * This method reject everything that is not specified / registered / unknown etc.
     * @param roleName
     * @param controllerName
     * @param actionName
     * @returns {boolean}
     */
    isAllowed: function( role, resource, action ){

        if(!role){
            role = 'guest';
        }

        // Reject if ACL is not register for this resource
        if( ! this._isRoleRegistered(role) || ! this._isResourceRegistered(resource) ){
            sails.log.info("Permission policy, trying to get a unknown role or resource or action [role="+role+"][resource="+resource+"][action="+action+"]");
            return false;
        }

        var isAuthorized = this._isRoleAllowedRecursively(role, resource, action);
        sails.log.info("Permission policy, Restrict/Grant access to [current role tested="+role+"][resource="+resource+"][action="+action+"][access="+isAuthorized+"]");

        return isAuthorized;
    },

    /**
     * Check recursively if one role is allowed to perform this resource's action.
     * It will check recursively through the role's parents.
     * @param role
     * @param resource
     * @param action
     * @returns {*}
     * @private
     */
    _isRoleAllowedRecursively: function( role, resource, action ){

        // Check if this current role is denied
        if( this._isDenied(role, resource, action) ){
            sails.log.info("Permission policy, Restrict access to [current role tested="+role+"][resource="+resource+"][action="+action+"]");
            return false;
        }
        // Otherwise check if this current role has rights
        else if( this._isAllowed(role, resource, action) ){
            sails.log.info("Permission policy, Allow access to [" + role + "][resource="+resource+"][action="+action+"]");
            return true;
        }
        else{
            var parent = this._getParent(role);
            if(parent == null){
                return false;
            }
            else{
                return this._isRoleAllowedRecursively( parent, resource, action );
            }
        }
    },

    /**
     * Check if this resource's action is denied for this role.
     * @param role
     * @param resource
     * @param action
     * @returns {boolean}
     * @private
     */
    _isDenied: function(role, resource, action){
        var aclForRole = this.permissions.acl[ role ];
        if( aclForRole.deny && aclForRole.deny[resource] && aclForRole.deny[resource].indexOf(action) > -1 ){
            return true;
        }
        return false;
    },

    /**
     * Check if this resource's action is allowed for this role.
     * @param role
     * @param resource
     * @param action
     * @returns {boolean}
     * @private
     */
    _isAllowed: function(role, resource, action){
        var aclForRole = this.permissions.acl[ role ];
        if( aclForRole.allow && aclForRole.allow[resource] && aclForRole.allow[resource].indexOf(action) > -1 ){
            return true;
        }
        return false;
    },

    /**
     * Check if a resource with that name has been registered.
     * @param resource
     * @returns {boolean}
     * @private
     */
    _isResourceRegistered: function( resource ){
        return this.permissions.resources.indexOf(resource) < 0 ? false : true;
    },

    /**
     * Check if a role with that name has been registered.
     * @param role
     * @returns {boolean}
     * @private
     */
    _isRoleRegistered: function( role ){
        var found = false;
        _.forEach(this.permissions.roles, function(entry){
            if(entry.name === role){
                found = true;
            }
        });
        return found;
    },

    _getParent: function( role ){
        var parent = null;
        _.forEach(this.permissions.roles, function(entry){
            if(entry.name === role && entry.parent){
                parent = entry.parent;
            }
        });
        return parent;
    }

};

module.exports = PermissionService;
// `sails` is not available out here
// (it doesn't exist yet)