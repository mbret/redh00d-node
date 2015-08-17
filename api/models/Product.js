/**
 * Product
 *
 * @module      :: Model
 * @description ::
 * @docs		:: http://sailsjs.org/#!documentation/models, https://github.com/balderdashy/waterline-docs/blob/master/models.md
 */

module.exports = _.merge( _.cloneDeep( require('./BaseModel') ), {

    tableName: 'PRODUCT',
    autoPK: true,

    attributes:{

        id: {
            type: 'integer',
            autoIncrement: true,
            unique: true,
            index: true,
            primaryKey: true,
            columnName: 'ID_PRODUCT'
        },
        //isOfficial: {
        //    type: 'boolean',
        //    defaultsTo: false
        //},
        name: {
            type: 'string',
            required: true,
            unique: true,
            columnName: 'NAME'
        },
        //logo: {
        //    type: 'string',
        //    required: true
        //},
        category: {
            model: 'productcategory',
            required: true,
            columnName: 'ID_CATEGORY'
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

    }


});
