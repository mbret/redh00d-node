/**
 *
 *
 * @module      :: Model
 * @description ::
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

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
            columnName: 'userGradeID'
        },
        name: {
            type: 'string',
            columnName: 'userGradeName'
        },
        displayName: {
            type: 'string',
            columnName: 'userGradeDisplayName'
        }


    },

    beforeCreate: function( cb ){
        return cb();
    },

    beforeUpdate: function( cb ){
        return cb();
    }


});
