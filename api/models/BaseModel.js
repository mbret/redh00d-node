module.exports = {

    attributes: {

        toJSON: function() {
            var model = this.toObject();
            return model;
        },

        /**
         * This method protect sensitive data before sending to customers
         * - overwrite this method in child model
         */
        toCustomer: function() {
            return this.toObject();
        }
    },

    beforeValidation: function(event, next){
        next();
    },

    beforeCreate: function(event, next){
        next();
    },

    afterCreate: function(newlyInsertedEvent, next){
        next();
    },

    beforeUpdate: function(event, next){
        next();
    },

    afterUpdate: function(newlyUpdatedEvent, next){
        next();
    },

    /**
     * Call .toCustomer() to all model inside the given array and return it
     */
    toCustomer: function( models ){
        var customerModels = [];
        for( var i in models ){
            customerModels.push( models[i].toCustomer() );
        }
        return customerModels;
    }

}