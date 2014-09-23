var Q = require("q");

module.exports = {

    /**
     * Add to the database the default and minimal informations.
     * @return promise
     */
    seedDefaultData: function(){
        return Q().then(function(){
            return Q.all([
                UserRole.create({ name: 'admin', displayName: 'Administrator', ID: 1 }),
                UserRole.create({ name: 'user', displayName: 'User', ID: 2 }),

                ProductCategory.create({name: 'food', displayName: 'Food', ID: 1}),
                ProductCategory.create({name: 'drink', displayName: 'Drink', ID: 2}),
            ]);

        }).then(function(){
            return User.create({email: 'admin@admin.com', password: 'password', firstName: 'Admin', lastName: 'Admin', ID:1, role: 1});
        });
    },

    /**
     * @return promise
     */
    seedTestData: function(){
        return Q().then(function(){
            return Q.all([
                User.create({email: 'xmax54@gmail.com', password: 'password', firstName: 'User', lastName: 'User', ID:2}),
                User.create({email: 'user2@user2.com', password: 'password', firstName: 'User', lastName: 'User', ID:3}),

                Product.create({isOfficial: true, name: 'Coca Cola', logo: 'coca_cola', category: 2, ID:1}),
                Product.create({isOfficial: false, name: 'Chips', logo: null, category: 1, ID:2})
            ]);

        }).then(function() {
            return Q.all([
                // events
                Event.create({name:'Soirée pyjama', description:'Venez tous nue', author: 2, place: 'Toul', date: '2014-12-31', ID: 1}),
                Event.create({name:'Meeting redh00d', description:'On va fumer de la bonne grosse beu !!', author: 2, place: 'Coloc', date: '2014-12-01'})
            ]);

        }).then(function() {
            return Q.all([
                // products of events
                EventProduct.create({eventID:1, userID: 2, productID: 2, quantity: 2}),
                EventProduct.create({eventID:1, userID: 2, productID: 1, quantity: 1})
            ]);

        });
    },


    resetUserForTest: function(){

    }

}