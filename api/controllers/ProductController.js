/**
 * Created by maxime on 30/07/2014.
 * @description Interract with model Product
 * @todo write this controller
 */
module.exports = {

    /**
     * Find a product
     */
    find: function(req, res){
        Product.findOne({'ID':req.param('id')}).populate('category').exec(function(err,product){
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
        // Get optional parameters from URL to refine the search
        var optionalData = {};

        var optionalSortData = {};

        // Build query with sort, etc
        var findQuery = Product.find(optionalData);
        if( optionalSortData !== {} ) {
            findQuery.sort(optionalSortData);
        }
        findQuery.populate('category');

        // Run job
        findQuery.exec(function callback(err, products){
            if(err) return res.serverError(err);
            return res.ok({
                products: Product.toJSON( products )
            });
        });
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
            return Product.findOne({'ID': product.ID}).populate('category').then(function(product){
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

}
