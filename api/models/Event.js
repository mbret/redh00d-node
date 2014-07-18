/**
 * Event
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models, https://github.com/balderdashy/waterline-docs/blob/master/models.md
 */

module.exports = {

    attributes: {

        ID: {
            type: 'integer',
            autoIncrement: true,
            unique: true,
            index: true,
            primaryKey: true
        },
        name: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string',
            required: true
        },
        place: {
            type: 'string',
            required: true
        },
        date: {
            type: 'datetime',
            required: true
        },
        createdDate: {
            type: 'datetime'
        },
        updatedDate: {
            type: 'datetime'
        },

        /**
         * Return a safe object for customers
         * @returns {*}
         */
        toCustomer: function(){
            var obj = this.toObject();
            console.log(obj);
            delete obj.ID;
            return obj.toJSON();
        },


    },

    validation_messages: {
        place: {
            string: 'undefined',
            required: 'required'
        }
    }

};
