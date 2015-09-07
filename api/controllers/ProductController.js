/**
 * Created by maxime on 30/07/2014.
 * @description Interract with model Product
 */
var validator = require('validator');

module.exports = {

    /**
     * Find a product
     */
    find: function(req, res){

        var id = req.param('id', null);
        if(!validator.isNumeric(id)){
            return res.badRequest();
        }

        sails.models.product
            .findOne({'id': id}).populate('category')
            .then(function(product){
                if(!product)
                    return res.notFound();

                return res.ok(product.toJSON());
            })
            .catch(res.serverError);
    },

    /**
     * Find products
     */
    findMultiple: function(req, res){
        sails.models.product
            .find({})
            .then(function(products){
                return res.ok(sails.models.product.toJSON(products));
            })
            .catch(res.serverError);
    },

    /**
     *
     * @todo write this method
     */
    delete: function(req, res){

        return res.send(501);
    },

    /**
     *
     * @todo write this method
     */
    create: function(req, res){
        var data = {};
        data.name = req.param('name', null);
        data.logo = req.param('logo', null);
        data.category = req.param('category', null);

        // param only for admin
        if( req.user.isAdmin() ){
            data.isOfficial = req.param('official', null);
        }

        sails.models.product.create( data)
            .then(function(product){
                return sails.models.product.findOne({'id': product.id}).populate('category').then(function(product){
                    if(!product) return res.notFound();
                    return res.created(product.toJSON());
                });
            })
            .catch(function(err){
                if(err.ValidationError)
                    return res.badRequest();
                else
                    return res.serverError(err);
            });
    },

    /**
     * - who can update ?
     * @todo write this method
     */
    update: function(req, res){
        return res.send(501);
    }

};
