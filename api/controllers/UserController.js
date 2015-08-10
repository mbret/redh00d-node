/**
 * UserController
 *
 * @module      :: Controller
 * @description	::
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var validator = require('validator');

module.exports = {

    /**
     * Find one user.
     * Data returned are protected
     * @todo block the request of admin user for customer ?
     * @route /users/:id
     * @return {user|500|404}
     */
    find: function (req, res) {

        var id = req.param('id', null);
        if( !validator.isNumeric(id) ){
            return res.badRequest();
        }

        User.findOne({'id': id}).populate('role').exec(function(err,user){
            if(err) return res.serverError(err);
            if(!user) return res.notFound();
            return res.ok(user.toJSON());
        });
    },

    /**
     * Find multiple users
     * @todo complete this method (params). Add a request like 'name like %' which return user which match a part of string
     * @todo block the request of admin user for customer ?
     * @return {users|500}
     */
    findMultiple: function (req, res) {

        // Get optional parameters from URL to refine the search
        var optionalData = {};
        if( req.param('id') ) optionalData.id = req.param('id');
        if( req.param('firstname') ) optionalData.firstName = req.param('firstname');
        if( req.param('email') ) optionalData.email = req.param('email');
        if( req.param('lastname') ) optionalData.lastName = req.param('lastname');

        var optionalSortData = {};
        if( req.param('firstname_sort') ) optionalSortData.firstName = req.param('firstname_sort');
        if( req.param('lastname_sort') ) optionalSortData.lastName = req.param('lastname_sort');

        //@todo implement these criteria
        if( req.param('firstname_like') || req.param('lastname_like') ) res.send(501);

        // Run job
        sails.models.user.find().populate('role')
            .then(function(users){
                return res.ok({
                    users: sails.models.user.toJSON( users )
                });
            })
            .catch(res.serverError);
    },

    /**
     * Create a new user.
     *
     * @description :: Create a simple user with the required fields.
     *                 This is a two time function, try to retrieve the user and only if the user doesn't exist then he is created.
     * @param req the params email & password should be present.
     * @returns {*}
     */
    create: function (req, res) {

        var data = {};
        if ( req.param('firstName') ) data.firstName = req.param('firstName');
        if ( req.param('lastName') ) data.lastName = req.param('lastName');
        if ( req.param('password') ) data.password = req.param('password');
        if ( req.param('phone') ) data.phone = req.param('phone');
        if ( req.param('email') ) data.email = req.param('email');
        // param only for admin
        if( req.user && req.user.isAdmin() ){
            if ( req.param('role_id') ) data.role = req.param('role_id');
        }

        // Create user
        User.create( data ).exec(function(err, user){
            if(err){
                if(err.ValidationError) return res.badRequest( {params: ErrorValidationHandlerService.transformFromWaterline(err.ValidationError)} );
                else return res.serverError(err);
            }
            return res.created({
                user: user.toJSON()
            });
        });
    },

    /**
     * Update an user
     * Check for updateOthers permission
     * @todo password update with token
     * @todo see about update collection ?
     * @param req
     * @todo make id required because if there are no id in param it update all items
     */
    update: function (req, res) {

        // Case of user try to update an other account
        if( (req.param('id') != req.user.id) && ! PermissionsService.isAllowed( req.user.role.name, req.options.controller, 'updateOthers') ){
            return res.forbidden();
        }
        else{

            // user data
            var data = {};
            if ( req.param('firstname') ) data.firstName = req.param('firstname');
            if ( req.param('lastname') ) data.lastName = req.param('lastname');
            if ( req.param('phone') ) data.phone = req.param('phone');
            // password case
            if( req.param('password') ){
                return res.send(501);
            }
            // param only for admin
            if(req.user.isAdmin()){
                if ( req.param('email') ) data.email = req.param('email');
            }

            // Query to update
            var query = {
                'id': req.param('id')
            }

            // Update process
            User.update(query, data, function(err, user) {

                if (err) {
                    if(err.ValidationError) return res.badRequest( {params: ErrorValidationHandlerService.transformFromWaterline(err.ValidationError)} );
                    else return res.serverError(err);
                }
                if(!user || user.length < 1) return res.notFound();

                return res.ok({
                    user: user[0].toJSON() // only return first result
                });
            });
        }
    },

    /**
     * Patch is like put but for specific job in order to change or restore something
     * Actions:
     *  - password lost
     *  -
     */
    patch: function (req, res) {

        // Case of user try to update an other account
        if( (req.param('id') != req.user.email) && ! PermissionsService.isAllowed( req.user.role.name, req.options.controller, 'patchOthers') ){
            return res.forbidden();
        }
        else{

            // catch action
            var action = null;
            if (req.param('reset_password') && (req.param('reset_password') === 'true' || req.param('reset_password') === true) ) {
                action = 'generateResetPasswordToken';
            }

            // check permission for specific action
            if (action != null && !PermissionsService.isAllowed(req.user.role.name, req.options.controller, action)) {
                return res.forbidden();
            }

            var query = validator.isEmail(req.param('id')) ? {email: req.param('id')} : req.param('id');
            
            // Check user
            User.findOne(query, function (err, user) {
                if (err) return res.serverError(err);
                if (!user) return res.notFound();

                // Process action
                doAction( user, action );
            });
        }


        // Process action
        function doAction( user, action ) {
            switch (action) {

                /**
                 * Create a new password reset token and send
                 * an email with instructions to user
                 * => req.param('id') should be an email here
                 */
                case 'generateResetPasswordToken':
//                    return res.send(501);
                    user.generatePasswordResetToken(function( err ){
                        if(err) return res.serverError(err);

                        // Case of silent do mail job in background and direct respond to customer
                        if(req.param('silent') && (req.param('silent') === 'true' || req.param('silent') == true ) ){
                            user.sendPasswordResetEmail(function( err ) {
                                // maybe if one error happens here do some job like another mail ...
                            });
                            res.noContent();
                        }
                        else{
                            user.sendPasswordResetEmail(function( err ) {
                                if (err) return res.serverError(err);
                                res.noContent();
                            });
                        }
                    })
                    break;

                default:
                    return res.send(405); // Method Not Allowed The response MUST include an Allow header containing a list of valid methods for the requested resource. (but we dont care for now)
                    break;
            }
        }

    },

    /**
     * Delete an user
     * Check for deleteOther permission
     */
    delete: function (req, res) {
        // Case of user try to delete an other account
        if( ! PermissionsService.isAllowed( req.user.role.name, req.options.controller, 'deleteOthers') ){
            return res.forbidden();
        }
        else{

            User.findOne(req.param('id')).then(function(user){
                if(!user){
                    return res.notFound();
                }
                
                // User cannot destroy itself
                if(user.id == req.user.id){
                    return res.badRequest();
                }
                else{
                    // destroy user
                    return User.destroy({id:req.param('id')}).then(function(){
                        return res.noContent();
                    });
                }
            }).catch(function(err){
                return res.serverError(err);
            });

        }
    }

};
