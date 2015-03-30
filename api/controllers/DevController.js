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
        //Load some data in parallel
        Promise.all([
            UserRole.find(),
            Event.find(),
            Product.find(),
            ProductCategory.find(),
            User.find()
        ])
        .spread(function (roles, events, products, productCategory, users) {
            data.roles = roles;
            data.events = events;
            data.products = products;
            data.product_category = productCategory;
            data.users = users;
        })
        .then(function () {
        return res.ok(data);

        }).fail(function (err) {
            return res.serverError(err);
        });

    },


    deleteLogs: function(req, res){
        var fs = require('fs');
        var input = __dirname + '../../../data/logs.log';
        fs.truncate(input, 0, function () {
            res.set('Content-Type', 'text/html');
            return res.send(200, "removed");
        });

    },

    /**
     * Display logs
     * @param req
     * @param res
     */
    logs: function(req, res){

        var fs = require('fs');
        var logs = "";
        var input = fs.createReadStream(__dirname + '../../../data/logs.log');

        function readLines(input, func, cb) {
            var remaining = '';

            input.on('data', function(data) {
                remaining += data;
                var index = remaining.indexOf('\n');
                while (index > -1) {
                    var line = remaining.substring(0, index);
                    remaining = remaining.substring(index + 1);
                    func(line);
                    index = remaining.indexOf('\n');
                }
            });

            input.on('end', function() {
                if (remaining.length > 0) {
                    func(remaining);
                }
                else{
                    cb();
                }
            });
        }

        readLines(input, function (data) {
            logs = logs + data + "<br/>";
        }, function(){
            logs += '<div id="end" ></div>';
            res.set('Content-Type', 'text/html');
            return res.send(200, logs);
        })
    }

}

