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
        return Promise
            .all([
                UserRole.create({name: 'admin', displayName: 'Administrator'}),
                UserRole.create({name: 'user', displayName: 'User'}),
                ProductCategory.create({name: 'food', displayName: 'Food'}),
                ProductCategory.create({name: 'drink', displayName: 'Drink'})
            ])
            .then(function(first){
                return Promise.all([
                    User.create({email: 'user@user.com', firstName: 'User', lastName: 'User'}),
                    User.create({email: 'user2@user2.com', firstName: 'User', lastName: 'User'}),
                    User.create({email: 'xmax54@gmail.com', firstName: 'Maxime', lastName: 'Bret'}),
                    User.create({ email: 'admin@admin.com', firstName: 'Admin', lastName: 'Admin', role: first[0].id }),
                ]).then(function(values){
                    return {
                        usersRoles: [first[0], first[1]],
                        users: values
                    };
                });
            })
            .then(function(values){
                return Promise.all([
                    Product.create({isOfficial: true, name: 'Coca Cola', logo: 'coca_cola', category: 2}),
                    Product.create({isOfficial: false, name: 'Chips', logo: 'chips', category: 1})
                ]).then(function(v){
                    values.products = v;
                    return values;
                });
            })
            .then(function(values){
                return Promise.all([
                    UserPassport.create({protocol: 'local', password: 'password', user: values.users[0].id}),
                    UserPassport.create({protocol: 'local', password: 'password', user: values.users[1].id}),
                    UserPassport.create({protocol: 'local', password: 'password', user: values.users[2].id}),
                    UserPassport.create({protocol: 'local', password: 'password', user: values.users[3].id}),
                ]).then(function(v){
                    values.usersPassports = v;
                    return values;
                });
            })
            .then(function(values){
                return Promise.all([
                    // events
                    Event.create({name:'Soirée pyjama', description:'Venez tous nue', author: 2, place: 'Toul', date: '2014-12-31', id: 1}),
                    Event.create({name:'Meeting redh00d', description:'On va fumer de la bonne grosse beu !!', author: 2, place: 'Coloc', date: '2014-12-01'}),
                ]).then(function(v){
                    values.events = v;
                    return values;
                });
            })
            .then(function(values){
                return Promise.all([
                    UserFriendship.create({ fromUser: values.users[0].id, toUser: values.users[1].id, type: 'friend'}),
                    UserFriendship.create({ fromUser: values.users[1].id, toUser: values.users[0].id, type: 'friend'}),
                    UserFriendship.create({ fromUser: values.users[0].id, toUser: values.users[2].id, type: 'friend'}),
                    UserFriendship.create({ fromUser: values.users[2].id, toUser: values.users[0].id, type: 'friend'}),
                ]).then(function(v){
                    values.friends = v;
                    return values;
                });
            }) 
            .then(function(values){
                return Promise .all([
                    // products of events
                    EventProduct.create({eventid:values.events[0].id, userid: 2, productid: 2, quantity: 2}),
                    EventProduct.create({eventid:values.events[1].id, userid: 2, productid: 1, quantity: 1})
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
                sails.log.debug('DatabaseService: The database seems to be already initialized, operation ommitted!');
                return;
            }

            return this.init_test();
        })

    }

}
