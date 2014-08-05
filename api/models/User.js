/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

//var bcrypt = require('bcrypt');
var uuid = require("node-uuid");
var  _ = require("lodash");

// use this method https://groups.google.com/forum/#!topic/sailsjs/GTGoOGHAEvE to emulate inheritance of object
// The base model is cloned and then merged with this model. This model is a child of the clone so not a child of ./BaseModel itself
module.exports = _.merge( _.cloneDeep( require('./BaseModel') ), {

    autoPK: true,

    attributes: {

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
        encryptedPassword: {
            type: 'string',
            columnName: "userPassword"
        },
        password: {
            type: 'string',
            minLength: 4,
            required: true
        },
        firstName: {
            type: 'string',
            columnName: 'userFirstName'
        },
        lastName: {
            type: 'string',
            columnName: 'userLastName'
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
        roleID: {
            type: 'integer',
            required: false,
            columnName: 'FK_userRoleID',
            defaultsTo: sails.config.general.defaultUserRoleName
        },
        role: {
            type: 'UserRole'
        },

        /**
         * Get user's full name
         */
        fullName: function() {
            return _.compact([this.firstName, this.lastName]).join(' ');
        },

        /**
         * Load the user role as a complete object
         * @param cb
         */
        loadRole: function( cb ){
            UserRole.findOne({ id: this.roleID }, function(err, role){
                if(err) return cb(err);
                if(!role){
                    sails.log.error("Unable to load role " + this.roleID);
                    return cb( new Error("Role doesn't exist") );
                }
                return cb();
            });
        },

        /**
         * Custom toJSON() implementation. Removes unwanted attributes.
         */
        toJSON: function() {
            var user = this.toObject();
            if(sails.config.environment !== 'development') {
                delete user.password;
                delete user.encryptedPassword;
                delete user.sessionTokens;
                delete user._csrf;
            }
            return user;
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
        }
    },

    beforeCreate: [
        // Encrypt user's password
        function (values, cb) {
            User.encryptPassword(values, function (err) {
                cb(err);
            });
        },

        // Create an API key
        //@todo maybe check here the uniqueness of the api key inside db before register
        function (values, cb) {
            values.apiKey = uuid.v4();
            sails.log.debug("User: Class.beforeCreate: API key generated '%s'", values.apiKey);
            cb();
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
