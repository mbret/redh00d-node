/**
 * Event product
 *
 * @module      :: Model
 * @description ::
 * @docs		:: http://sailsjs.org/#!documentation/models, https://github.com/balderdashy/waterline-docs/blob/master/models.md
 */

module.exports = _.merge( _.cloneDeep( require('./BaseModel') ), {

    tableName: 'event_product',
    autoCreatedAt: true,
    autoUpdatedAt: true,
    autoPK: true,
    identity: 'eventproduct',

    attributes:{

        id: {
            type: 'integer',
            autoIncrement: true,
            unique: true,
            index: true,
            primaryKey: true,
            columnName: 'eventProductID'
        },
        eventId: {
            type: 'integer'
        },
        userId: {
            type: 'integer'
        },
        productId: {
            type: 'integer'
        },
        quantity: {
            type: 'integer'
        }

    }


});
