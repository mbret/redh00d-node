/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

//var bcrypt = require('bcrypt');
var uuid = require("node-uuid");

// use this method https://groups.google.com/forum/#!topic/sailsjs/GTGoOGHAEvE to emulate inheritance of object
// The base model is cloned and then merged with this model. This model is a child of the clone so not a child of ./BaseModel itself
module.exports = _.merge( _.cloneDeep( require('./BaseModel') ), {

    autoPK: true,

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
//        events: {
//
//        },
//        friends: {
//
//        },
//        friendsGroups: {
//
//        },

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
         */
        validatePassword: function( candidatePassword, cb ) {
            if( candidatePassword === this.encryptedPassword ){
                return cb(null, true);
            }
            else{
                return cb(null, false);
            }
//            bcrypt.compare( candidatePassword, this.encryptedPassword, function (err, valid) {
//                if(err) return cb(err);
//                cb(null, valid);
//            });
        },

        /**
         * Generate password reset token
         */
        generatePasswordResetToken: function(cb) {
            this.passwordResetToken = Token.generate();
            this.save(function (err) {
                if(err) return cb(err);
                cb();
            });
        },

        /**
         * Send password reset email
         *
         * Generate a password reset token and send an email to the user with
         * instructions to reset their password
         */
        sendPasswordResetEmail: function(cb) {
            var self = this;

            this.generatePasswordResetToken(function (err) {
                if(err) return cb(err);

                // Send email
                var email = new Email._model({
                    to: {
                        name: self.fullName(),
                        email: self.email
                    },
                    subject: "Reset your password",
                    data: {
                        resetURL: sails.config.localAppURL + '/api/users/reset-password/#/' + self.ID + '/' +self.passwordResetToken.value
                    },
                    tags: ['password-reset','transactional'],
                    template: 'password-reset'
                });

                email.setDefaults();

                email.send(function (err, res, msg) {
                    cb(err, res, msg, self.passwordResetToken);
                });
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
                UserRole.findOne({ name: sails.config.general.defaultUserRoleName }, function(err, role){
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
        }
    ],

    /**
     * User password encryption. Uses bcrypt.
     */
    encryptPassword: function(values, cb) {
        values.encryptedPassword = values.password;
        sails.log.debug("User: Class.encryptPassword: Password encrypted from '%s' to '%s'", values.password, values.encryptedPassword);
        cb();
//        bcrypt.hash(values.password, 10, function (err, encryptedPassword) {
//            if(err) return cb(err);
//            values.encryptedPassword = encryptedPassword;
//            cb();
//        });
    }

});
