/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcryptjs');
var uuid = require("node-uuid");
var Promise = require('bluebird');

// use this method https://groups.google.com/forum/#!topic/sailsjs/GTGoOGHAEvE to emulate inheritance of object
// The base model is cloned and then merged with this model. This model is a child of the clone so not a child of ./BaseModel itself
module.exports = _.merge( _.cloneDeep( require('./BaseModel') ), {

    tableName: 'user',
    autoPK: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,

    attributes: {

        // BDD fields
        id: {
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

        firstName: {
            type: 'string',
            required: false,
            columnName: 'userFirstName'
        },

        lastName: {
            type: 'string',
            required: false,
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
            required: false
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
        toJSON: function() {
            var user = this.toObject();
            if( sails.config.all.protectJsonData === false ) {
                return user;
            }
            else{
                user.password = "***";
                user.email = "***";
                user.sessionTokens = "***";
                user._csrf = "***";
                return user;
            }

        },

        /**
         * Send password reset email
         *
         * send an email to the user with
         * instructions to reset their password
         */
        //sendPasswordResetEmail: function(cb) {
        //    var mailOptions = {
        //        from: sails.__(sails.config.all.mail.from.contact.name) + ' ' + '<' + sails.config.all.mail.from.contact.email + '>', // sender address
        //        to: this.email, // list of receivers
        //        subject: sails.__('Reset password'), // Subject line
//                text: sails.__('Please click on this link to update your password'), // plaintext body
//                html: '<b>' + sails.__('Please click on this link to update your password') + '</b>' // html body
//            };
//
//            MailerService.sendMail(mailOptions, function(err, info){
//                if(err){
//                    return cb(err);
//                }else{
//                    return cb();
//                }
//            });
//        },

        isAdmin: function(){
            return this.role.name === "admin";
        }

    },

    beforeCreate: [ setDefaultRoleIfUndefined ],

    beforeUpdate: [ ],

    /**
     * Return the user friends list.
     * @param userId
     * @returns Promise that contain the result as array or a reject promise.
     */
    findFriends: function(userId){
        return UserFriendship.find({fromUser: userId})// I don't know why but populate is bugged and only fill first row, so I load individually
            .then(function(friendships){
                var friendsToRetrieve = [];
                friendships.forEach(function(e){
                    friendsToRetrieve.push(User.findOne(e.toUser));
                });
                return Promise.all(friendsToRetrieve);
            });
    }

});

/**
 * Set the default user role if undefined during creation
 * @param values
 * @param cb
 * @returns {*}
 */
function setDefaultRoleIfUndefined(values, cb){
    if(values.role) return cb();

    sails.log.debug("User -> setDefaultRoleIfUndefined -> default is set (default=" + sails.config.permissions.defaultRole +")");
    UserRole.findDefault(function(err, role){
        if(err) return cb(err);
        if(!role) return cb( new Error("Unable to load the role") );

        values.role = role.id;
        return cb();
    })

}