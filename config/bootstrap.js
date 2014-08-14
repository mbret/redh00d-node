/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://links.sailsjs.org/docs/config/bootstrap
 */
var Q = require('Q');
module.exports.bootstrap = function(cb) {

    // @todo create and init data/access.log if it doesnt exist
    // @todo create and init data/logs.log if it doesnt exist

    /**
     * Init database
     */
    if(sails.config.general.initDatabase){
        Q().then(function(){

            /*
             * Init (using Q promises)
             * They are run in parallel
             */
            return Q.all([
                UserRole.create({ name: 'admin', displayName: 'Administrator', ID: 1 }),
                UserRole.create({ name: 'user', displayName: 'User', ID: 2 }),

                ProductCategory.create({name: 'food', displayName: 'Food', ID: 1}),
                ProductCategory.create({name: 'drink', displayName: 'Drink', ID: 2}),
            ]);

        }).then(function(){
            return Q.all([
                User.create({email: 'admin@admin.com', password: 'password', firstName: 'Admin', lastName: 'Admin', ID:1}),
                User.create({email: 'user@user.com', password: 'password', firstName: 'User', lastName: 'User', ID:2}),

                Product.create({isOfficial: true, name: 'Coca Cola', logo: 'coca_cola', categoryID: 2}),
                Product.create({isOfficial: false, name: 'Chips', logo: null, categoryID: 1})
            ]);

        }).then(function() {
            return Q.all([
                // events
                Event.create({name:'Soirée pyjama', description:'Venez tous nue', userID: 2, place: 'Toul', date: '2014-12-31'}),
                Event.create({name:'Meeting redh00d', description:'On va fumer de la bonne grosse beu !!', userID: 2, place: 'Coloc', date: '2014-12-01'})
            ]);

        }).then(function() {
            return Q.all([
                // products of events
                EventProduct.create({eventID:1, userID: 2, productID: 2, quantity: 2}),
                EventProduct.create({eventID:1, userID: 2, productID: 1, quantity: 1})
            ]);

        }).then(function() {
            return cb();

        }).fail(function (err) {
            return cb(err);
        });
    }
    else{


        return cb();
    }


};
