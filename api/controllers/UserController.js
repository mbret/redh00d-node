/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var validator = require('validator');

module.exports = {

    /**
     * Find one user.
     * Data returned are protected
     * @route /users/:id
     * @return {user|500|404}
     */
    find: function (req, res) {
        User.findOne({'ID':req.param('id')}, function(err,user){
            if(err) return res.serverError(err);
            if(!user) return res.notFound();
            return res.ok({
                user:user.toCustomer()
            });
        });
    },

    /**
     * Find multiple users
     * @todo complete this method (params). Add a request like 'name like %' which return user which match a part of string
     * @return {users|500}
     */
    findMultiple: function (req, res) {

        // Get optional parameters from URL to refine the search
        var optionalData = {};
        var optionalSortData = {};
        if( req.param('id') ) optionalData.ID = req.param('ID');
        if( req.param('firstname') ) optionalData.firstName = req.param('firstname');
        if( req.param('email') ) optionalData.email = req.param('email');
        if( req.param('lastname') ) optionalData.lastName = req.param('lastname');
        if( req.param('firstname_sort') ) optionalSortData.firstName = req.param('firstname_sort');

        // Build query with sort, etc
        var findQuery = User.find(optionalData);
        if( optionalSortData !== {} ) {
            findQuery.sort(optionalSortData);
        }

        // Run job
        findQuery.exec(function callback(err, users){
            if(err) return res.serverError(err);
            return res.ok({
                users: User.toCustomer( users )
            });
        });
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
        // Create user
        User.create({
            email: req.param('email'),
            password: req.param('password'),
            firstName: req.param('firstname'),
            lastName: req.param('lastname')
        })
        .exec(function(err, user){
            if(err){
                if(err.ValidationError) return res.badRequest( {params: ErrorValidationHandlerService.transformFromWaterline(err.ValidationError)} );
                else return res.serverError(err);
            }
            return res.created({
                user: user.toCustomer()
            });
        });
    },

    /**
     * Update an user
     * Check for updateOthers permission
     * @todo password update with token
     * @param req
     */
    update: function (req, res) {

        // Case of user try to update an other account
        if( (req.param('id') != req.user.ID) && ! PermissionsService.isAllowed( req.user.role.name, req.options.controller, 'updateOthers') ){
            return res.forbidden();
        }
        else{
            var dataToUpdate = {};
            if ( req.param('firstname') ) dataToUpdate.firstName = req.param('firstname');
            if ( req.param('lastname') ) dataToUpdate.lastName = req.param('lastname');
//            if ( req.param('password') ) dataToUpdate.password = req.param('password');
            if ( req.param('phone') ) dataToUpdate.phone = req.param('phone');
            // param only admina vailable
            if ( req.param('email') ){
                if(req.user.isAdmin()) dataToUpdate.email = req.param('email');
            }

            var query = {
                'ID': req.param('id')
            }
            User.update(query, dataToUpdate, function(err, user) {

                if (err) {
                    if(err.ValidationError) return res.badRequest( {params: ErrorValidationHandlerService.transformFromWaterline(err.ValidationError)} );
                    else return res.serverError(err);
                }
                if(!user || user.length < 1) return res.notFound();

                return res.ok({
                    user: user[0].toCustomer()
                });
            });
        }
    },

    patch: function (req, res) {
        return res.send(501);

        /**
         * Create a new password reset token and send
         * an email with instructions to user
         * => req.param('id') should be an email here
         */
        if ( req.param('reset_password') && req.param('reset_password') === 'true' ){

            User.findOne({email: req.param('id')}, function (err, user) {
                if(err) return res.serverError(err);
                if(!user) return res.notFound();

                return res.ok();
//                Jobs.create('sendPasswordResetEmail', { user: user.toObject() }).save(function (err) {
//                    if(err) return res.serverError(err);
//                    res.noContent();
//                });
            });
        }

        // /**
        //  * Update user password
        //  * Expects and consumes a password reset token
        //  */
        // resetPassword: function(req, res, next) {
        //     if (!req.params.id) return res.notFound();
        //
        //     if (!req.body.token) return res.badRequest({ token: "required" });
        //
        //     User.findOneById(req.params.id, function (err, user) {
        //         if (err) return next(err);
        //
        //         // Check if the token is valid
        //         if (!user.passwordResetToken || user.passwordResetToken.value !== req.body.token)
        //             return res.badRequest({ token: "invalid" });
        //
        //         // Check if token is expired
        //         var expires = new Date().setHours( new Date().getHours() - 2 );
        //
        //         if (user.passwordResetToken.issuedAt.getTime() <= expires)
        //             return res.badRequest({ token: "expired" });
        //
        //         // Check if password has been provided
        //         if (!req.body.password)
        //             return res.badRequest({ password: "required" });
        //
        //         // Check if password matches confirmation
        //         if (req.body.password !== req.body.passwordConfirmation)
        //             return res.badRequest({ passwordConfirmation: "invalid" });
        //
        //         // Update user with new password
        //         user.password = req.body.password;
        //         user.save(function (err) {
        //             if (err) return next(err);
        //
        //             // Send user data back to client
        //             res.send( user.toJSON() );
        //         });
        //     });
        // },
    },

    /**
     * Delete an user
     * Check for deleteOther permission
     */
    delete: function (req, res) {
        // Case of user try to delete an other account
        if( (req.param('id') != req.user.ID) && ! PermissionsService.isAllowed( req.user.role.name, req.options.controller, 'deleteOthers') ){
            return res.forbidden();
        }
        else{

            User.findOne({'ID':req.param('id')}).then(function(user){
                if(!user) return res.notFound();
                return User.destroy({ID:req.param('id')}).then(function(){
                    return res.noContent();
                });
            }).fail(function(err){
                return res.serverError(err);
            });

        }
    }


  
};
