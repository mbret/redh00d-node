(function(){
    'use strict';
    module.exports = function(){
        var UserRole = sails.models.userrole;
        return Promise
            .all([
                UserRole.create({name: 'admin', displayName: 'Administrator'}),
                UserRole.create({name: 'user', displayName: 'User'}),
                //Models.ProductCategory.create({name: 'food', displayName: 'Food'}),
                //Models.ProductCategory.create({name: 'drink', displayName: 'Drink'})
            ])
        .then(function(results){
            return Promise.all([
                sails.models.user.create({ email: 'user@user.com', firstName: 'User', lastName: 'User'}),
                sails.models.user.create({ email: 'admin@admin.com', firstName: 'Admin', lastName: 'Admin', role: results[0].id }),

            ]).then(function(values){
                return {
                    usersRoles: [results[0], results[1]],
                    users: values
                };
            });
        })
        //.then(function(values){
        //    return Promise.all([
        //        //Product.create({isOfficial: true, name: 'Coca Cola', logo: 'coca_cola', category: 2}),
        //        //Product.create({isOfficial: false, name: 'Chips', logo: 'chips', category: 1})
        //    ]).then(function(v){
        //        values.products = v;
        //        return values;
        //    });
        //})
        .then(function(values){
            return Promise.all([
                sails.models.userpassport.create({protocol: 'local', password: 'password', user: values.users[0].id}),
                sails.models.userpassport.create({protocol: 'local', password: 'password', user: values.users[1].id}),
        //        //UserPassport.create({protocol: 'local', password: 'password', user: values.users[2].id}),
        //        //UserPassport.create({protocol: 'local', password: 'password', user: values.users[3].id}),
            ]).then(function(v){
                values.usersPassports = v;
                return values;
            });
        //})
        //.then(function(values){
        //    return Promise.all([
        //        // events
        //        //Event.create({name:'Soirée pyjama', description:'Venez tous nue', author: 2, place: 'Toul', date: '2014-12-31', id: 1}),
        //        //Event.create({name:'Meeting redh00d', description:'On va fumer de la bonne grosse beu !!', author: 2, place: 'Coloc', date: '2014-12-01'}),
        //    ]).then(function(v){
        //        values.events = v;
        //        return values;
        //    });
        //})
        //.then(function(values){
        //    // Create friendships between users
        //    return Promise.all([
        //        //sails.models.userrequestFriend(values.users[0].id, values.users[1].id),
        //        //sails.models.userrequestFriend(values.users[1].id, values.users[0].id), // accept
        //        //sails.models.userrequestFriend(values.users[0].id, values.users[2].id),
        //        //sails.models.userrequestFriend(values.users[2].id, values.users[0].id), // accept
        //    ]).then(function(v){
        //        values.friends = v;
        //        return values;
        //    });
        });
    };
})();

