/**
 * Event
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models, https://github.com/balderdashy/waterline-docs/blob/master/models.md
 */

module.exports = {

    tableName: 'event',

    autoCreatedAt: true,
    autoUpdatedAt: true,

    autoPK: true,

    attributes: {

        ID: {
            type: 'integer',
            autoIncrement: true,
            unique: true,
            index: true,
            primaryKey: true,
            columnName: 'eventID'
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
        }


    },

    validation_messages: {
        place: {
            string: 'undefined',
            required: 'required'
        }
    }

};
