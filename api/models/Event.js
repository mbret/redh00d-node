/**
 * Event
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models, https://github.com/balderdashy/waterline-docs/blob/master/models.md
 */

module.exports = _.merge( _.cloneDeep( require('./BaseModel') ), {

    tableName: 'event',
    identity: 'event',

    attributes:{

        id: {
            type: 'integer',
            autoIncrement: true,
            unique: true,
            index: true,
            primaryKey: true,
            columnName: 'ID_EVENT'
        },
        author: {
            model: 'user',
            columnName: 'ID_USER',
            required: true,
            index: true
        },
        title: {
            type: 'string',
            required: true,
            columnName: 'TITLE'
        },
        description: {
            type: 'string',
            required: true,
            columnName: 'DESCRIPTION'
        },
        location: {
            type: 'string',
            required: true,
            columnName: 'LOCATION'
        },
        date: {
            type: 'datetime',
            required: true,
            columnName: 'DATE'
        },

    },

    // Modifies user input before validation
    beforeValidation: function(event, next){

        // Filter date
        if( ! event.date || event.date == '0000-00-00'){
            event.date == null;
        }

        //@todo
        next();
    },

    beforeCreate: function(event, next){
//        console.log(event.date);
        //@todo convert date to database datetime
        next();
    }

});
