/**
 * Created by maxime on 30/07/2014.
 * @description Interract with model
 * @todo write this controller
 */
module.exports = {

    /*
     * Friendships request relative part
     */

    /**
     * Find a friendship request
     * @todo write this method
     */
    find: function(req, res){
        return res.send(501);
    },

    /**
     * Find friendships requests
     * @todo write this method
     */
    findMultiple: function(req, res){
        return res.send(501);
    },

    /**
     * Remove the current friendship with given friend
     * - delete the request. does not take care of request state.
     * @todo write this method
     */
    delete: function(req, res){
        return res.send(501);
    },

    /**
     * Create a friendship request
     * - Create a request with status as waiting
     * @todo write this method
     */
    create: function(req, res){
        return res.send(501);
    },

    /**
     * Not used yet
     *
     */
    update: function(req, res){
        return res.send(501);
    },


    /*
     * Friends relative part
     */

    /**
     * Find one friend
     * @todo write this method
     */
    findFriend: function(req, res){

        return res.send(501);

    },

    /**
     * Find friends
     * @todo write this method
     */
    findFriends: function(req, res){
        var id = req.param('id', null);
        if( !validator.isNumeric(id) ){
            return res.badRequest();
        }

        // get user friends
        User.findFriends(id)
            .then(function(friends){
                return res.ok(friends);
            })
            .catch(res.serverError);
    }

}
