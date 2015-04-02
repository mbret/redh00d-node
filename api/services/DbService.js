var Promise = require('bluebird');

module.exports = {

    /**
     *
     * @return promise
     */
    init: function(env){
        return this['init_' + env]();
    },

    init_test: function() {
        return Promise.all([
            UserRole.create({name: 'admin', displayName: 'Administrator'}),
            UserRole.create({name: 'user', displayName: 'User'}),
            ProductCategory.create({name: 'food', displayName: 'Food'}),
            ProductCategory.create({name: 'drink', displayName: 'Drink'})
        ])
        .then(function(values){
            return Promise.all([
                User.create({email: 'user@user.com', password: 'password', firstName: 'User', lastName: 'User'}),
                User.create({email: 'user2@user2.com', password: 'password', firstName: 'User', lastName: 'User'}),
                User.create({ email: 'admin@admin.com', password: 'password', firstName: 'Admin', lastName: 'Admin', role: values[0].ID }),
                Product.create({isOfficial: true, name: 'Coca Cola', logo: 'coca_cola', category: 2}),
                Product.create({isOfficial: false, name: 'Chips', logo: 'chips', category: 1})
            ]);
        })
        .then(function(){
            return Promise.all([
                // events
                Event.create({name:'Soirée pyjama', description:'Venez tous nue', author: 2, place: 'Toul', date: '2014-12-31', ID: 1}),
                Event.create({name:'Meeting redh00d', description:'On va fumer de la bonne grosse beu !!', author: 2, place: 'Coloc', date: '2014-12-01'})
            ]);
        })
        .then(function(events){
            return Promise .all([
                // products of events
                EventProduct.create({eventID:events[0].ID, userID: 2, productID: 2, quantity: 2}),
                EventProduct.create({eventID:events[1].ID, userID: 2, productID: 1, quantity: 1})
            ]);
        });

    },

    init_development: function(){
        return this.init_test();
    },

    /**
     * For the production there is a small change.
     * It's not possible to drop or alter so we need to check if db already contain data.
     * If yes then do not init.
     * To reset database delete .tmp
     */
    init_production: function(){
        sails.log.debug('Dbservice: production database initializing...');
        return UserRole.findOne({name: 'admin'}).then(function(widget){

            if(widget){
                sails.log.debug('DbService: The database seems to be already initialized, operation ommitted!');
                return;
            }

            return this.init_test();
        })

    }

}
