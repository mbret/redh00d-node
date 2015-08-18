var request = require('supertest');
var assert = require("assert");
var should  = require('chai').should();

describe('integration.controllers.product', function() {

    var products;
    var productsCategories;

    before(function(done){

        // create products categories
        return Promise
            .all([
                sails.models.productcategory.create({name: 'food', displayName: 'Food'}),
                sails.models.productcategory.create({name: 'drink', displayName: 'Drink'})
            ])
            .then(function(results){
                productsCategories = results;

                // create products
                return Promise
                    .all([
                        sails.models.product.create({isOfficial: true, name: 'Coca Cola', logo: 'coca_cola', category: productsCategories[1].id}),
                        sails.models.product.create({isOfficial: false, name: 'Chips', logo: 'chips', category: productsCategories[0].id})
                    ])
                    .then(function(results){
                        products = results;
                    });
            })
            .then(function(){
                done();
            })
            .catch(done);
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

    describe("GET", function(){

        it('should respond product with id x', function(done){
            request(sails.hooks.http.app).get('/products/' + products[0].id).set('Authorization', sails.config.test.userAuth)
                .expect(200)
                .expect(function(res){
                    if( !res.body || !res.body.id == products[0].id ) throw new Error("No product or wrong product");
                })
                .end(done);
        });

        it('should respond 400', function(done){
            async.series([
                function(callback){
                    request(sails.hooks.http.app).get('/products/x').set('Authorization', sails.config.test.userAuth)
                        .expect(400).end(callback);
                },
            ], function(err, results){
                if(err) return done(err);
                done();
            });
        });

        it('should respond 404', function(done){
            async.series([
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
                    res.body.should.not.be.empty;
                })
                .end(done);
        });

    });

    describe("POST", function(){

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
                    assert.equal(res.body.name, 'banana');
                    //assert.equal(res.body.isOfficial, false);
                    assert.equal(res.body.category.id, productsCategories[0].id);
                })
                .end(done);
        });

        // official: admin
        //it('should not be able to set these criteria', function(done){
        //    request(sails.hooks.http.app).post('/products').send({official: true, name: 'youhou', category: 1, logo: 'youhou.jpg'}).set('Authorization', sails.config.test.userAuth)
        //        .expect(201).expect(function(res){
        //            console.log(res.body);
        //            res.body.should.have.property()
        //            assert.equal(res.body.product.isOfficial, false);
        //        })
        //        .end(done);
        //});

    });

    describe("PUT /products", function(){


    });

    describe("DELETE /products", function(){


    });

});