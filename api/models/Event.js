/**
 *
 */
module.exports = _.merge( _.cloneDeep( require('./BaseModel') ), {

    tableName: 'EVENT',
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

        // @todo test in /models
        picture: {
            type: 'string',
            required: false,
            columnName: 'PICTURE',
            defaultsTo: null
        },

        // Define whether or not others are allowed to set products to bring
        otherMayBring: {
            type: 'boolean',
            required: false,
            defaultsTo: true,
            columnName: 'OTHER_MAY_BRING'
        },

        createdAt: {
            type: 'datetime',
            defaultsTo: function (){ return new Date(); },
            columnName: 'CREATED_AT'
        },

        updatedAt: {
            type: 'datetime',
            defaultsTo: function (){ return new Date(); },
            columnName: 'UPDATED_AT'
        },
    },

    // Modifies user input before validation
    beforeValidation: function(event, next){
        next();
    },

    beforeCreate: function(event, next){
        next();
    }

});
