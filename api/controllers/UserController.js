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

module.exports = {

     /**
     * find an user.
     *
     * @description :: try to find an user by id
     * @route /users/:id
     * @return {user}
     */
    find: function (req, res) {
        User.findOne(req.param('id')).exec(function(err,user){
            if(err){
                return res.serverError(err);
            }
            if(!user){
                return res.notFound( res.i18n("resource (%s) doesn't exist", res.i18n('user')) );
            }
            return res.ok({
                user:user
            });
        });
     },
     
    /**
     * find an user.
     *
     * @description : try to find an user by email
     * @route /users/:email
     * @return {user}
     */
    
    findByEmail: function (req, res) {
        User.findOne(req.param('email')).exec(function(err,user){
            if(err){
                return res.serverError(err);
            }
            if(!user){
                return res.notFound( res.i18n("resource (%s) doesn't exist", res.i18n('user')) );
            }
            return res.ok({
                user:user
            });
        });
     },

    // @todo
    findMultiple: function (req, res) {
        res.notFound();
    },

    /**
     * Create a new user.
     *
     * @description :: Create a simple user with the required fields.
     *                 This is a two time function, try to retrieve the user and only if the user doesn't exist then he is created.
     * @todo try to make a better handle of (already exist) maybe handle this error after User.create for more logic and less spaghetti
     * @param req the params email & password should be present.
     * @param res
     * @returns {*}
     */
    create: function (req, res) {

        // Check user
        User.findOne( {email: req.param('email') }).exec(function(err, user){

            if(err){
                return res.serverError(err);
            }
            if( user ){
                // If an user was found it's because email is taken
                return res.badRequest( res.i18n('email already taken') );
            }
            else{

                // Create user
                User.create({
                    email: req.param('email'),
                    password: req.param('password'),
                    firstName: req.param('firstName'),
                    lastName: req.param('lastName')
                })
                .exec(function(err, user){
                    if(err){
                        // Validation error
                        if(err.ValidationError){
                            console.log(res.i18n);
                            return res.badRequest( res.i18n('Parameters invalid'), err.ValidationError );
                        }
                        else{
                            return res.serverError(err);
                        }
                    }
                    return res.created({
                        user: user
                    });
                });
            }
        });

    },


    /**
     * Update an user
     * Required parameters: id
     * Optional parameters: firstname/lastname/email/password
     * @param req
     */
    update: function (req, res) {
        var dataToUpdate = {};
        if ( req.param('firstname') ) dataToUpdate.firstname = req.param('firstname');
        if ( req.param('lastname') ) dataToUpdate.lastname = req.param('lastname');
        if ( req.param('email') ) dataToUpdate.email = req.param('email');
        if ( req.param('password') ) dataToUpdate.password = req.param('password');
        var query = {
            'ID': req.param('id')
        }
        User.update(query, dataToUpdate, function(err, user) {

            if (err) {
                // Error due to validators
                if (err.ValidationError) {
                    return res.badRequest('The given parameters are invalid', err.ValidationError);
                }
                else {
                    return res.serverError();
                }
            }
            if(!user || user.length < 1){
                return res.notFound( res.i18n("resource (%s) doesn't exist", res.i18n('user')) );
            }else{
                return res.ok({
                    user: user
                });
            }
        });
    },

    // @todo
    patch: function (req, res) {

    },

    // @todo
    destroy: function (req, res) {

    },


    /**
     * Create a new password reset token and send
     * an email with instructions to user
     */
    createPasswordResetToken: function(req, res, next) {
        if (!req.body.email) return res.badRequest({ email: "required" });

        User.findOneByEmail(req.body.email, function (err, user) {
            if(err) return res.serverError(err);

            if(!user) return res.badRequest({ user: "not found" });

            Jobs.create('sendPasswordResetEmail', { user: user.toObject() }).save(function (err) {
                if(err) return res.serverError(err);
                res.send({ info: "Password reset instructions sent" });
            });
        });
    },


    /**
     * Update user password
     * Expects and consumes a password reset token
     */
    resetPassword: function(req, res, next) {
        if (!req.params.id) return res.notFound();

        if (!req.body.token) return res.badRequest({ token: "required" });

        User.findOneById(req.params.id, function (err, user) {
            if (err) return next(err);

            // Check if the token is valid
            if (!user.passwordResetToken || user.passwordResetToken.value !== req.body.token)
                return res.badRequest({ token: "invalid" });

            // Check if token is expired
            var expires = new Date().setHours( new Date().getHours() - 2 );

            if (user.passwordResetToken.issuedAt.getTime() <= expires)
                return res.badRequest({ token: "expired" });

            // Check if password has been provided
            if (!req.body.password)
                return res.badRequest({ password: "required" });

            // Check if password matches confirmation
            if (req.body.password !== req.body.passwordConfirmation)
                return res.badRequest({ passwordConfirmation: "invalid" });

            // Update user with new password
            user.password = req.body.password;
            user.save(function (err) {
                if (err) return next(err);

                // Send user data back to client
                res.send( user.toJSON() );
            });
        });
    },


    /**
    * Overrides for the settings in `config/controllers.js`
    * (specific to UserController)
    */
    _config: {}

  
};
