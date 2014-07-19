/**
 * EventController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    /**
     * Return an event by id
     * @route /events/:id
     * @return {event}
     */
    find: function (req, res) {

        Event.findOne( req.param('id')).exec( function(err, event){

            if(err){
                //@todo
                return res.serverError(err);
            }
            if(!event){
                return res.notFound( res.i18n("resource (%s) doesn't exist", res.i18n('event')) );
            }
            // Send a JSON response
            return res.ok({
                event: event
            });
        });

    },


    /**
     * Return all events.
     * Return a list of events (empty or not) and a status 200.
     */
    findMultiple: function (req, res) {

        // Get optional parameters from URL to refine the search
        var optionalData = {};
        if( req.param('id') ){
            optionalData.ID = req.param('id');
        }
        if( req.param('name') ){
            optionalData.name = req.param('name');
        }

        // Get all events (with data)
        Event.find( optionalData ).exec( function(err, events){
            if(err){
                //@todo
                return res.serverError(err);
            }
            if(!events){
                return res.notFound("No events");
            }
            return res.ok({
                events: events
            });
        });
    },

    /**
     * Create a new event
     * @param req
     * @param res
     * @returns {*}
     */
    create: function(req, res){

        // Create the event
        Event.create({
            name: req.param('name'),
            description: req.param('description'),
            place: req.param('place'),
            date: req.param('date')

        }).exec(function(err, event){
            if(err){
                // Validation error
                if(err.ValidationError){
                    return res.badRequest( 'The given parameters are invalid', err.ValidationError );
                }
                else{
                    return res.serverError(err);
                }
            }

            return res.created({
                event: event
            });
        });

    },


    /**
     * Delete an event
     * @param req
     * @param res
     */
    destroy: function(req, res){

        // Check the event before deletion
        Event.findOne( req.param('id')).exec(function(err, event){
            if(err){
                //@todo
                return res.noFound("This event doesn't exist");
            }

            // Deletion
            event.destroy(function(err){
                if(err){
                    //@todo
                    return res.serverError(err);
                }
                return res.noContent();
            })
        });
    },


    /**
     * Update an event
     * Required parameters: id
     * Optional parameters: name/date/description/place
     * @param req
     * @param res
     */
    update: function(req, res){

        // Get param from request
        var dataToUpdate = {};
        if ( req.param('name') ) dataToUpdate.name = req.param('name');
        if ( req.param('place') ) dataToUpdate.place = req.param('place');
        if ( req.param('description') ) dataToUpdate.description = req.param('description');
        if ( req.param('date') ) dataToUpdate.date = req.param('date');

        var query = {
            'ID': req.param('id')
        }

        Event.update(query, dataToUpdate, function(err, event) {

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
     * Overrides for the settings in `config/controllers.js`
     * (specific to EventController)
     */
    _config: {}

  
};
