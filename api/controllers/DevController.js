/**
 * DebugController
 *
 * @description :: Server-side logic for managing Debugs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Promise = require("bluebird");

module.exports = {

    /**
     * Display some info from database.
     * Use this method for debug only
     * @param req
     * @param res
     */
    dumpDatabase: function(req, res) {

        var data = {};
        if (req.user) {
            data.loggedUser = req.user;
        }

        /*
         * This is an example of how structure code when using promises
         * Some code is executed in parallel and other in sequential
         * Always use "return" for a promises otherwise values and error will not be catchable
         */
        Promise.resolve().then(function () {
            //Load some data in parallel
            return Promise.all([
                UserRole.find(),
                Event.find(),
                Product.find(),
                ProductCategory.find(),
                User.find()

            ]).spread(function (roles, events, products, productCategory, users) {
                data.roles = roles;
                data.events = events;
                data.products = products;
                data.product_category = productCategory;
                data.users = users;
            });

        }).then(function () {
            return res.ok(data);

        }).catch(function (err) {
            return res.serverError(err);
        });

    },

};




