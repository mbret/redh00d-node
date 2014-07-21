/**
 * DebugController
 *
 * @description :: Server-side logic for managing Debugs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    dumpDatabase: function(req, res){

        User.find().exec(function(err, users){

            Event.find().exec(function(err, events){
                return res.ok({
                    users: users,
                    event: events
                });
            });

        });


    }

};

