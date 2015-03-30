/**
 * Event
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models, https://github.com/balderdashy/waterline-docs/blob/master/models.md
 */

module.exports = _.merge( _.cloneDeep( require('./BaseModel') ), {

    tableName: 'event',
    autoCreatedAt: true,
    autoUpdatedAt: true,
    autoPK: true,

    attributes:{

        // BDD fields
        ID: {
            type: 'integer',
            autoIncrement: true,
            unique: true,
            index: true,
            primaryKey: true,
            columnName: 'eventID'
        },
        author: {
            model: 'User',
            columnName: 'FK_userApplicantID',
            required: true,
            index: true
        },
        name: {
            type: 'string',
            required: true,
            columnName: 'eventName'
        },
        description: {
            type: 'string',
            required: true,
            columnName: 'eventDescription'
        },
        place: {
            type: 'string',
            required: true,
            columnName: 'eventPlace'
        },
        date: {
            type: 'datetime',
            required: true,
            columnName: 'eventDate'
        },
        // This attribute is auto managed by ORM
        createdAt: {
            type: 'datetime',
            columnName: 'eventCreatedDate'
        },
        // This attribute is auto managed by ORM
        updatedAt: {
            type: 'datetime',
            columnName: 'eventUpdatedDate'
        },

    },

    // Modifies user input before validation
    beforeValidation: function(event, next){

        // Filter date
        if( ! event.date || event.date == '0000-00-00'){
            event.date == null;
        }

        console.log(event.date);
        //@todo
        next();
    },

    beforeCreate: function(event, next){
//        console.log(event.date);
        //@todo convert date to database datetime
        next();
    }

});
