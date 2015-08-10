/**
 * Created by maxime on 30/07/2014.
 * @description Interract with model Product
 * @todo write this controller
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

        Product.findOne({'id': id}).populate('category').exec(function(err,product){
            if(err) return res.serverError(err);
            if(!product) return res.notFound();
            return res.ok({
                product: product.toJSON()
            });
        });
    },

    /**
     * Find products
     * @todo enable criteria
     */
    findMultiple: function(req, res){
        sails.models.product.find({})
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
        if ( req.param('name') ) data.name = req.param('name');
        if ( req.param('logo') ) data.logo = req.param('logo');
        if ( req.param('category') ) data.category = req.param('category');

        // param only for admin
        if( req.user.isAdmin() ){
            if ( req.param('official') ) data.isOfficial = req.param('official');
        }

        // Run job
        Product.create( data).then(function(product){
            return Product.findOne({'id': product.id}).populate('category').then(function(product){
                if(!product) return res.notFound();
                return res.created({
                    product: product.toJSON()
                });
            });
        })
        .catch(function(err){
            if(err.ValidationError) return res.badRequest( {params: ErrorValidationHandlerService.transformFromWaterline(err.ValidationError)} );
            else return res.serverError(err);
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
