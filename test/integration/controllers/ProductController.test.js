var request = require('supertest');
var assert = require("assert");

describe('ProductController', function() {

    var products;
    var productsCategories;

    before(function(done){
        Product.find().exec(function(err, entries){
            if(err) done(err);
            products = entries;
            ProductCategory.find().exec(function(err, entries){
                if(err) done(err);
                productsCategories = entries;
                done();
            });
        });
    });

    beforeEach(function(done){
        done();
    });

    after(function(done){
        done();
    });

    afterEach(function(done){
        done();
    });

    describe("GET /products", function(){

        it('should respond product with id x', function(done){
            request(sails.hooks.http.app).get('/products/' + products[0].id).set('Authorization', sails.config.test.userAuth)
                .expect(200)
                .expect(function(res){
                    if( !res.body.product || !res.body.product.id == products[0].id ) throw new Error("No product or wrong product");
                })
                .end(done);
        });

        it('should respond 404', function(done){
            async.series([
                function(callback){
                    request(sails.hooks.http.app).get('/products/x').set('Authorization', sails.config.test.userAuth)
                        .expect(404).end(callback);
                },
                function(callback){
                    request(sails.hooks.http.app).get('/products/99999').set('Authorization', sails.config.test.userAuth)
                        .expect(404).end(callback);
                }
            ], function(err, results){
                if(err) return done(err);
                done();
            });
        });

        it('should respond list of products', function(done){
            request(sails.hooks.http.app).get('/products').set('Authorization', sails.config.test.userAuth)
                .expect(200)
                .expect(function(res){
                    if( !res.body.products ) throw new Error("No products");
                })
                .end(done);
        })

    });

    describe("POST /products", function(){

        // nothing and then category is missing
        it('should respond Bad Request', function(done){
            async.series([
                function(callback){
                    request(sails.hooks.http.app).post('/products').set('Authorization', sails.config.test.userAuth)
                        .expect(400).end(callback);
                },
                function(callback){
                    request(sails.hooks.http.app).post('/products').send({name: 'qsds'}).set('Authorization', sails.config.test.userAuth)
                        .expect(400).end(callback);
                }
            ], function(err, results){
                if(err) return done(err);
                return done();
            });
        });

        it('should create the product banana', function(done){
            request(sails.hooks.http.app).post('/products').send({name: 'banana', category: productsCategories[0].id, logo: 'banana.jpg'}).set('Authorization', sails.config.test.userAuth)
                .expect(201).expect(function(res){
                    assert.equal(res.body.product.name, 'banana');
                    assert.equal(res.body.product.isOfficial, false);
                    assert.equal(res.body.product.category.id, productsCategories[0].id);
                })
                .end(done);
        });

        // official: admin
        it('should not be able to set these criteria', function(done){
            request(sails.hooks.http.app).post('/products').send({official: true, name: 'youhou', category: 1, logo: 'youhou.jpg'}).set('Authorization', sails.config.test.userAuth)
                .expect(201).expect(function(res){
                    assert.equal(res.body.product.isOfficial, false);
                })
                .end(done);
        });

    });

    describe("PUT /products", function(){


    });

    describe("DELETE /products", function(){


    });

});