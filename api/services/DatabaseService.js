var Q = require("q");

module.exports = {

    /**
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
                User.create({email: 'user@user.com', password: 'password', firstName: 'User', lastName: 'User', ID:2}),
                User.create({email: 'user2@user2.com', password: 'password', firstName: 'User', lastName: 'User', ID:3}),

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

        });
    },


    resetUserForTest: function(){

    }

}