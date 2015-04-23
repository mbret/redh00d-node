'use strict';
/**
 * Created by mbret on 23/04/2015.
 */
module.exports = function (sails) {

    return {

        configure: function(){

        },

        initialize: function (cb) {
            return cb();
        },

        routes: {
            before: {
                //'GET /*': function (req, res, next) {
                //    return next();
                //}
            },
            after: {
                //'GET /*': function (req, res, next) {
                //    return next();
                //}
            }
        }
    };
};