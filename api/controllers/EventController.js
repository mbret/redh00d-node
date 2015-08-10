/**
 * EventController
 *
 * @module      :: Controller
 * @description	::
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var validator = require('validator');

module.exports = {

    /**
     * Return an event by id
     */
    find: function (req, res) {

        var id = req.param('id', null);
        if( !validator.isNumeric(id) ){
            return res.badRequest();
        }

        sails.models.event.findOne({ id: id }).populate('author')
            .then(function(event){
                if(!event) return res.notFound();
                return res.ok({
                    event:event.toJSON()
                });
            })
            .catch(res.serverError);
    },

    /**
     * Return all events.
     * Return a list of events (empty or not) and a status 200.
     * @todo write this method
     */
    findMultiple: function (req, res) {

        // Get optional parameters from URL to refine the search
        var optionalData = {};
        if( req.param('id') ) optionalData.id = req.param('id');
        if( req.param('name') ) optionalData.name = req.param('name');
        if( req.param('date') ) optionalData.date = req.param('date');
        if( req.param('place') ) optionalData.place = req.param('place');

        var optionalSortData = {};
        if( req.param('date_sort') ) optionalSortData.date = req.param('date_sort');
//        if( req.param('lastname_sort') ) optionalSortData.lastName = req.param('lastname_sort');

        //@todo implement these criteria
//        if( req.param('firstname_like') || req.param('lastname_like') ) res.send(501);

        // Build query with sort, etc
        var findQuery = sails.models.event.find(optionalData);
        if( optionalSortData !== {} ) {
            findQuery.sort(optionalSortData);
        }
        findQuery.populate('author');

        // Run job
        findQuery.exec(function callback(err, events){
            if(err) return res.serverError(err);
            return res.ok({
                events: sails.models.event.toJSON( events )
            });
        });
    },

    /**
     * Delete an event
     * - Only admin can delete events
     * @todo write this method
     */
    destroy: function(req, res){
        return res.send(501);
    },

    /**
     * Update an event
     *
     * @todo write this method
     */
    update: function(req, res){

        return res.send(501);

        // Get param from request
        var dataToUpdate = {};
        if ( req.param('name') ) dataToUpdate.name = req.param('name');
        if ( req.param('place') ) dataToUpdate.place = req.param('place');
        if ( req.param('description') ) dataToUpdate.description = req.param('description');
        if ( req.param('date') ) dataToUpdate.date = req.param('date');

        var query = {
            'id': req.param('id')
        }

        sails.models.event.update(query, dataToUpdate, function(err, event) {

            if (err) {
                // Error due to validators
                if (err.ValidationError) {
                    return res.badRequest('The given parameters are invalid', err.ValidationError);
                }
                else {
                    return res.serverError();
                }
            }
            if(!event || event.length < 1){
                return res.notFound( res.i18n("resource (%s) doesn't exist", res.i18n('event')) );
            }else{
                return res.ok({
                    event: event
                });
            }
        });
    },

    /**
     * Find a user by id from an event
     * @param req
     * @param res
     */
    findUser: function(req, res){
        // inject event id in request
        req.param.eventId = req.param('id');
        sails.controllers.user.findMultiple(req, res);
    },

    /**
     * Create an event
     * -
     * @todo write this method
     */
    create: function(req, res){
        return res.send(501);

        var eventData = {
            name: req.param('name'),
            description: req.param('description'),
            place: req.param('place'),
            date: req.param('date')
        };

        if( ! req.param('user_id') ) return res.badRequest( "no user specified" );

        // Search user to inject id
        User.findOne( {id: req.param('user_id')}).exec(function(err, user){
            if(err) return res.serverError();
            if( ! user ) return res.notFound( res.i18n("Resource (%s) doesn't exist", res.i18n('user')) );

            eventData.userId = user.id;

            // Create the event
            sails.models.event.create( eventData ).exec(function(err, event){
                if(err){
                    // Validation error
                    if(err.ValidationError){
                        return res.badRequest( null, err.ValidationError );
                    }
                    else{
                        return res.serverError(err);
                    }
                }

                return res.created({
                    event: event
                });
            });
        });

    },

    /**********************************
     *
     * Invitations relatives method
     *
     **********************************/

    /**
     * Create an invitation
     * - add an event member and put the state to (waiting)
     */
    createInvitation: function(req, res){
        return res.send(501);
    }


  
};
