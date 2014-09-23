var request = require('supertest');
var assert = require("assert");

describe('ProductController', function() {

    var authorization = "Basic eG1heDU0QGdtYWlsLmNvbTpwYXNzd29yZA=="; // xmax54@gmail.com / password
    var authorizationAdmin = 'Basic YWRtaW5AYWRtaW4uY29tOnBhc3N3b3Jk'; // admin@admin.com / password
//    var request = request(sails.hooks.http.app);

    before(function(done){
        done();
    })

    beforeEach(function(done){
        done();
    })

    after(function(done){
        done();
    })

    afterEach(function(done){
        done();
    })

    describe("GET /products", function(){

        it('should respond product with ID 1', function(done){
            request(sails.hooks.http.app).get('/api/products/1').set('Authorization', authorization)
                .expect(200)
                .expect(function(res){
                    if( !res.body.product || !res.body.product.ID == 1 ) throw new Error("No product or wrong product");
                })
                .end(done);
        });

        it('should respond 404', function(done){
            async.series([
                function(callback){
                    request(sails.hooks.http.app).get('/api/products/x').set('Authorization', authorization)
                        .expect(404).end(callback);
                },
                function(callback){
                    request(sails.hooks.http.app).get('/api/products/20').set('Authorization', authorization)
                        .expect(404).end(callback);
                }
            ], function(err, results){
                if(err) return done(err);
                done();
            });
        });

        it('should respond list of products', function(done){
            request(sails.hooks.http.app).get('/api/products').set('Authorization', authorization)
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
                    request(sails.hooks.http.app).post('/api/products').set('Authorization', authorization)
                        .expect(400).end(callback);
                },
                function(callback){
                    request(sails.hooks.http.app).post('/api/products').send({name: 'qsds'}).set('Authorization', authorization)
                        .expect(400).end(callback);
                }
            ], function(err, results){
                if(err) return done(err);
                return done();
            });
        });

        it('should create the product banana', function(done){
            request(sails.hooks.http.app).post('/api/products').send({name: 'banana', category: 1}).set('Authorization', authorization)
                .expect(201).expect(function(res){
                    assert.equal(res.body.product.name, 'banana');
                    assert.equal(res.body.product.isOfficial, false);
                    assert.equal(res.body.product.category.ID, 1);
                })
                .end(done);
        });

        // official: admin
        it('should not be able to set these criteria', function(done){
            request(sails.hooks.http.app).post('/api/products').send({official: true, name: 'youhou', category: 1}).set('Authorization', authorization)
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