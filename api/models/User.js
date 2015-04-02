/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcryptjs');
var uuid = require("node-uuid");

// use this method https://groups.google.com/forum/#!topic/sailsjs/GTGoOGHAEvE to emulate inheritance of object
// The base model is cloned and then merged with this model. This model is a child of the clone so not a child of ./BaseModel itself
module.exports = _.merge( _.cloneDeep( require('./BaseModel') ), {

    tableName: 'user',
    autoPK: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,

    attributes: {

        // BDD fields
        ID: {
            type: 'integer',
            autoIncrement: true,
            unique: true,
            index: true,
            primaryKey: true,
            columnName: 'userID'
        },
        email: {
            type: 'email',
            required: true,
            unique: true,
            columnName: "userMail"
        },
        // Password for bdd
        encryptedPassword: {
            type: 'string',
            columnName: "userPassword"
        },
        firstName: {
            type: 'string',
            required: true,
            columnName: 'userFirstName'
        },
        lastName: {
            type: 'string',
            required: true,
            columnName: 'userLastName'
        },
        // Not required because it has a default value (see below)
        role: {
            model: 'UserRole',
            columnName: 'FK_userRoleID',
            required: false
        },
        phone: {
            type: 'int',
            required: false,
            defaultTo: null,
            columnName: 'userPhone'
        },
        passwordResetToken: {
            type: 'json',
            columnName: 'userPasswordResetToken'
        },
        apiKey: {
            type: 'string',
            unique: true,
            columnName: 'userApiKey'
        },
        // Managed by waterline
        createdAt: {
            type: 'datetime',
            columnName: 'userCreatedDate'
        },
        // Managed by waterline
        updatedAt: {
            type: 'datetime',
            columnName: 'userUpdatedDate '
        },

        // Other fields
        // Password used before bdd for validation
        password: {
            type: 'string',
            minLength: 4,
            required: true
        },

        /**
         * Get user's full name
         */
        fullName: function() {
            return _.compact([this.firstName, this.lastName]).join(' ');
        },

        /**
         * This method protect sensitive data before sending to customers
         * Return everything for development
         */
        toCustomer: function() {
            var user = this.toObject();
            if( sails.config.general.protectJsonData === false ) {
                return user;
            }
            else{
                user.password = "***";
                user.email = "***";
                user.encryptedPassword = "***";
                user.sessionTokens = "***";
                user._csrf = "***";
                user.apiKey = "***";
                return user;
            }

        },

        /**
         * Check if the supplied password matches the stored password.
         * - Useful when login action, change password ...
         */
        validatePassword: function( candidatePassword, cb ) {
            bcrypt.compare( candidatePassword, this.encryptedPassword, function (err, valid) {
                if(err) return cb(err);
                cb(null, valid);
            });
        },

        /**
         * Generate password reset token
         */
        generatePasswordResetToken: function(cb) {
            var token = TokenService.generate(); // get json object
            User.update( {'ID': this.ID}, {passwordResetToken: token}, function (err, user) {
                    if(err) return cb(err);
                    this.passwordResetToken = token;
                    return cb();
                }
            );
        },

        /**
         * Send password reset email
         *
         * send an email to the user with
         * instructions to reset their password
         */
        sendPasswordResetEmail: function(cb) {
            var mailOptions = {
                from: sails.__(sails.config.general.mail.from.contact.name) + ' ' + '<' + sails.config.general.mail.from.contact.email + '>', // sender address
                to: this.email, // list of receivers
                subject: sails.__('Reset password'), // Subject line
//                text: sails.__('Please click on this link to update your password'), // plaintext body
                html: '<b>' + sails.__('Please click on this link to update your password') + '</b>' // html body
            };

            MailerService.sendMail(mailOptions, function(err, info){
                if(err){
                    return cb(err);
                }else{
                    console.log('Message sent: ' + info);
                    return cb();
                }
            });
        },

        isAdmin: function(){
            return this.role.name === "admin";
        }

    },

    beforeCreate: [

        // Encrypt user's password
        function (values, cb){
            User.encryptPassword(values, function (err) {
                return cb(err);
            });
        },

        // Create an API key
        //@todo maybe check here the uniqueness of the api key inside db before register
        function (values, cb) {
            values.apiKey = uuid.v4();
            sails.log.debug("User: Class.beforeCreate: API key generated '%s'", values.apiKey);
            cb();
        },

        // Set default role
        function(values, cb){
            if( ! values.role ){
                sails.log.debug("User.beforeCreate no roleID provided, default is set (default=" + sails.config.general.defaultUserRoleName +")");
                UserRole.findDefault(function(err, role){
                    if(role){
                        values.role = role.ID;
                    }
                    else{
                        return cb( new Error("Unable to load the role") );
                    }
                    return cb(err);
                })
            }
            else{
                return cb();
            }
        }

    ],

    beforeUpdate: [
        // Encrypt user's password, if changed
        function (values, cb) {
            if ( values.password ) {
                User.encryptPassword(values, function (err) {
                    cb(err);
                });
            }
            return cb(); // otherwise continue
        },
    ],

    /**
     * User password encryption. Uses bcrypt.
     */
    encryptPassword: function(values, cb) {
//        values.encryptedPassword = values.password;
//        cb();
        bcrypt.hash(values.password, 10, function (err, encryptedPassword) {
            if(err) return cb(err);
            values.encryptedPassword = encryptedPassword;
            sails.log.info("User: Class.encryptPassword: Password encrypted from '%s' to '%s'", values.password, values.encryptedPassword);
            return cb();
        });


    }

});
