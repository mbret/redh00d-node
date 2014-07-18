/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        ID: {
            type: 'integer'
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true,
            columnName: 'encrypted_password'
        }
    
    },

    // Lifecycle Callbacks
    beforeCreate: function(values, next) {
        bcrypt.hash(values.password, 10, function(err, hash) {
            if(err) return next(err);
            values.password = hash;
            next();
        });
    }

};
