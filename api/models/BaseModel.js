module.exports = {

    attributes: {


        toJSON: function() {
            var model = this.toObject();
            return model;
        }
    },

    beforeCreate: function( cb ){
        return cb();
    },

    beforeUpdate: function( cb ){
        return cb();
    }

}