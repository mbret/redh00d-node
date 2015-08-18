/**
 * http://chaijs.com/guide/styles/
 */
var assert  = require("assert");
var should  = require('chai').should();
var expect  = require('chai').expect;

describe('integration.models.product', function() {

    var category = null;
    var testProduct = {
        name: 'Product of model test',
        category: null
    };

    before(function(done){
        // Create used category in these test suite
        sails.models.productcategory
            .create({
                name: 'Category for test product model',
            })
            .then(function(entry){
                category = entry;
                testProduct.category = category.id;
            })
            .then(done)
            .catch(done);
    });

    after(function(done){
        // Remote used category
        sails.models.productcategory
            .destroy(category.id)
            .then(function(){
                done();
            })
            .catch(done);
    });

    describe('create', function(){

        var id = null;

        it('should create a valid product', function (done) {
            sails.models.product
                .create(testProduct)
                .then(function(product){
                    expect(product).to.have.property('id');
                    expect(product).to.have.property('category');
                    expect(product.name).to.equal(testProduct.name);
                    expect(product.category).to.equal(testProduct.category);
                    id = product.id;
                    done();
                })
                .catch(done);
        });

        it('should not create two same product', function (done) {
            sails.models.product
                .create(testProduct)
                .then(function(product){
                    done(new Error('Product should not have been created'));
                })
                .catch(function(err){
                    expect(err.code).to.equal('E_VALIDATION');
                    done();
                });
        });

        after(function(done){
            sails.models.product
                .destroy(id)
                .then(function(){
                    done();
                })
                .catch(done);
        });

    });

    describe('destroy', function(){

        var id = null;

        before(function(done){
            sails.models.product
                .create(testProduct)
                .then(function(product){
                    if(!product) done(new Error('Unable to create product'));
                    id = product.id;
                    done();
                })
                .catch(done);
        });

        it('should destroy the product', function(done){
            sails.models.product
                .destroy(id)
                .then(function(productsDeleted){
                    expect(productsDeleted).to.have.length(1);
                    expect(productsDeleted[0]).to.have.property(sails.models.product.attributes.id.columnName);
                    expect(productsDeleted[0][sails.models.product.attributes.id.columnName]).to.equal(id);
                    done();
                })
                .catch(done);
        });

    });

});