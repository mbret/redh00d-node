(function(){
    'use strict';


    var validator = require('validator');

    /**
     * Created by maxime on 30/07/2014.
     * @description Interract with model UserfriendsGroup and UserGroupMember.
     *              Group are relative to each users and are unique for these users.
     * @todo write this controller
     */
    module.exports = {

        /**
         *
         * @todo write this method
         */
        find: function(req, res){
            return res.send(501);
        },

        /**
         *
         * @todo write this method
         */
        findMultiple: function(req, res){
            return res.send(501);
        },

        /**
         *
         *
         */
        create: function(req, res){
            var id = req.param('userid', null);
            if( !validator.isNumeric(id) ){
                return res.badRequest(null, sails.config.errorCode.E_USER_INVALID);
            }

            // Check group
            var name = req.param('name', null);
            if(!validator.isLength(name, 1)){
                return res.badRequest(null, sails.config.errorCode.E_POST_DATA_INVALID);
            }

            // Create group

            res.ok();
        },

        /**
         *
         * @todo write this method
         */
        update: function(req, res){
            return res.send(501);
        },

        /**
         * Delete a group
         * @todo write this method
         */
        delete: function(req, res){
            return res.send(501);
        },

        /*
         * Group member relative
         */

        /**
         *
         * @todo write this method
         */
        addMember: function(req, res){
            return res.send(501);
        },

        /**
         * Delete a group member
         * @todo write this method
         */
        deleteMember: function(req, res){
            return res.send(501);
        }
    }

})();