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

        ID: {
            type: 'integer',
            autoIncrement: true,
            unique: true,
            index: true,
            primaryKey: true,
            columnName: 'productID'
        },
        isOfficial: {
            type: 'boolean'
        },
        name: {
            type: 'string'
        },
        logo: {
            type: 'string'
        },
        categoryID: {
            type: 'integer'
        }

    }


});
