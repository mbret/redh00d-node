/**
 * Product
 *
 * @module      :: Model
 * @description ::
 * @docs		:: http://sailsjs.org/#!documentation/models, https://github.com/balderdashy/waterline-docs/blob/master/models.md
 */

module.exports = _.merge( _.cloneDeep( require('./BaseModel') ), {

    tableName: 'product',
    autoCreatedAt: true,
    autoUpdatedAt: true,
    autoPK: true,

    attributes:{

        id: {
            type: 'integer',
            autoIncrement: true,
            unique: true,
            index: true,
            primaryKey: true,
            columnName: 'productID'
        },
        isOfficial: {
            type: 'boolean',
            defaultsTo: false
        },
        name: {
            type: 'string',
            required: true
        },
        logo: {
            type: 'string',
            required: true
        },
        category: {
            model: 'ProductCategory',
            columnName: 'FK_productCategoryID',
            required: true
        }

    }


});
