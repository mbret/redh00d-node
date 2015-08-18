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
var crypto = require('crypto');

// use this method https://groups.google.com/forum/#!topic/sailsjs/GTGoOGHAEvE to emulate inheritance of object
// The base model is cloned and then merged with this model. This model is a child of the clone so not a child of ./BaseModel itself
module.exports = _.merge( _.cloneDeep( require('./BaseModel') ), {

    tableName: 'user',
    autoPK: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    identity: 'user',

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

        createdAt: {
            type: 'datetime',
            defaultsTo: function (){ return new Date(); },
            columnName: 'createdAt'
        },

        updatedAt: {
            type: 'datetime',
            defaultsTo: function (){ return new Date(); },
            columnName: 'updatedAt'
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

        /**
         * @todo
         * @returns {bluebird|exports|module.exports}
         */
        sendPasswordResetEmail: function(){
            var self = this;
            return new Promise(function(resolve, reject){
                async.waterfall([
                    // generate token
                    function(done){
                        crypto.randomBytes(20, function(err, buf){
                            var token = buf.toString('hex');
                            done(err, token);
                        });
                    },
                    // Update local auth with token
                    function(token, done){
                        return sails.models.userpassport.update( { user: self.id }, {
                            resetPasswordToken: token,
                            resetPasswordTokenExpires: new Date(Date.now() + 3600000) // 1 hour
                        })
                            .then(function(entries){
                                if(!entries) return done(new Error('No UserPassport for id ' + self.id)); // should not happen
                                return done(null, token);
                            })
                            .catch(done);
                    },
                    // send mail
                    function(token, done){
                        MailerService.send({
                            to: self.email, // list of receivers
                            subject: 'Reset password ?', // Subject line
                            html: '<b>HWant to reset password ? use ' + token + '</b>' // html body
                        });
                        done();
                    }
                ], function(err){
                    if(err){
                        return reject(err);
                    }
                    else{
                        return resolve();
                    }
                });
            });
        },

        /**
         * Helper that return if an user is admin or not.
         * @returns {boolean}
         */
        isAdmin: function(){
            return this.role.name === "admin";
        }

    },

    beforeCreate: [ setDefaultRoleIfUndefined ],

    beforeUpdate: [ ],

    beforeDestroy: function(criteria, cb){
        cb();
    },

    afterDestroy: function(destroyedRecords, cb){
        var requests = [];
        destroyedRecords.forEach(function(record){
           requests.push(sails.models.userpassport.destroy({user: record.userID}));
        });
        Promise.all(requests)
            .then(cb.bind(this, null))
            .catch(cb);
    },

    /**
     * Return the user friends list.
     * @param userId
     * @returns Promise that contain the result as array or a reject promise.
     */
    findFriends: function(userId, status){
        // get all friendship where userId is related
        return UserFriendship.find({fromUser: userId})// I don't know why but populate is bugged and only fill first row, so I load individually
            .then(function(friendships){
                var friendsToRetrieve = [];
                // For each relation load the complete user
                friendships.forEach(function(e){
                    friendsToRetrieve.push(sails.models.user.findOne(e.toUser));
                });
                return Promise.all(friendsToRetrieve);
            });
    },

    /**
     * Create a friend request from a user to another or accept a reciprocate request.
     * You need to call this method twice and change the id order to accept the request completely.
     * @param fromUserId
     * @param toUserId
     */
    requestFriend: function(fromUserId, toUserId){
        // Check if a relationship link exist
        //return UserFriendship.find({ fromUser: fromUserId, toUser: toUserId})
        //    .then(function(friendship){
                // Scenario 1: A relationship exist between these two users
                // In case a relationship exist, we accept it
                //if(friendship){
                //    friendship.status = 'accepted';
                //    return friendship.save();
                //}
                // In case no relationship exist we create it in both way
                //else{
                    return UserFriendship.create({ fromUser: fromUserId, toUser: toUserId, status: 'requested'})
                        .then(function(){
                            return UserFriendship.create({ fromUser: toUserId, toUser: fromUserId, status: 'pending'})
                        });
                //}
            //});
    },

    /**
     * Delete a friendship between these two user.
     * @param fromUserId
     * @param toUserId
     */
    removeFriend: function(fromUserId, toUserId){

    },

    /**
     * Block a user friend.
     * @param fromUserId
     * @param toUserId
     */
    blockFriend: function(fromUserId, toUserId){

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
    sails.models.userrole.findDefault(function(err, role){
        if(err) return cb(err);
        if(!role) return cb( new Error("Unable to load the role") );

        values.role = role.id;
        return cb();
    })

}