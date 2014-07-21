/**
 * DebugController
 *
 * @description :: Server-side logic for managing Debugs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    dumpDatabase: function(req, res){

        var data = {};
        if( req.user ){
            data.loggedUser = req.user;
        }

        // retrieve users
        User.find().exec(function(err, users){

            data.users = users
            // retrieve events
            Event.find().exec(function(err, events){

                data.events = events;
                return res.ok(data);
            });

        });




    }

};

