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
                return res.ok(event.toJSON());
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
        var search = {};
        if( req.param('id') ) search.id = req.param('id');
        if( req.param('name') ) search.name = req.param('name');
        if( req.param('date') ) search.date = req.param('date');
        if( req.param('place') ) search.place = req.param('place');

        var optionalSortData = [];
        // @todo
        //if( req.param('date_sort') ) optionalSortData.push('date ' + req.param('date_sort'));
//        if( req.param('lastname_sort') ) optionalSortData.lastName = req.param('lastname_sort');

        //@todo implement these criteria
//        if( req.param('firstname_like') || req.param('lastname_like') ) res.send(501);

        var query = {};

        // where
        if(Object.keys(search) > 0){
            query.where = search;
        }

        // sort
        // @todo

        // Run job
        sails.models.event.find(query).populate('author')
            .then(function(events){
                return res.ok(sails.models.event.toJSON(events));
            })
            .catch(res.serverError);
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
        };

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

        var title = req.param('title', null);
        var description = req.param('description', null);
        var location = req.param('location', null);
        var user = req.user.id;
        var date = req.param('date', null);

        if(!validator.isLength(title, 1)){
            return res.badRequest();
        }

        if(!validator.isDate(date)){
            return res.badRequest();
        }

        if(!validator.isNumeric(user)){
            return res.badRequest();
        }

        // Permissions check
        // @todo

        // Create the event
        sails.models.event
            .create({
                title: title,
                description: description,
                author: user,
                location: location,
                date: date
            })
            .then(function(event){
                return res.created(event);
            })
            .catch(function(err){
                if(err.code === 'E_VALIDATION'){
                    return res.badRequest();
                }
                return res.serverError(err);
            });

        // Search user to inject id
        //sails.models.user.findOne( {id: req.param('user_id')}).exec(function(err, user){
        //    if(err) return res.serverError();
        //    if( ! user ) return res.notFound( res.i18n("Resource (%s) doesn't exist", res.i18n('user')) );
        //
        //    eventData.userId = user.id;
        //});

    },

    /**
     * Create an invitation
     * - add an event member and put the state to (waiting)
     */
    createInvitation: function(req, res){
        return res.send(501);
    }


  
};
