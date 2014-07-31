// ------------------------------------------------------------------------------------------
//                                      Events
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// Shortcut for fetch events params
// Include this structure if you need params used as filter
// ------------------------------------------------------------------------------------------
/**
 * @apiDefineStructure fetchEventsParams
 * @apiParam (urlParam) {Number} [id] Use it to retrieve only one event with its ID.
 * @apiParam (urlParam) {String} [eventName]
 * @apiParam (urlParam) {String} [eventDate]
 * @apiParam (urlParam) {String} [eventPlace]
 * @apiParam (urlParam) {String} [sort] get the result sorted
 */



// ------------------------------------------------------------------------------------------
// Fetch one
//
//  - EventController.find()
// ------------------------------------------------------------------------------------------

/**
 * @api {get} /events/:id Find an event
 * @apiName FindEvent
 * @apiGroup Events
 * @apiGroupDescription API corresponding to Event
 * @apiDescription Find an event by its ID
 * <br/><b>Throw error:</b> 404
 *
 * @apiParam {Number} id Event unique ID.
 * @apiExample Use example
 * get http://localhost/events/15
 *
 * @apiSuccessStructure FindSuccess
 *
 */

// ------------------------------------------------------------------------------------------
// Fetch all
//
// - EventController.findMultiple()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /events Find events
 * @apiName FindMultipleEvents
 * @apiGroup Events
 * @apiPermission authenticated
 * @apiDescription look for Events
 * <br/><b>Throw error:</b>
 *
 * @apiStructure fetchEventsParams
 * @apiExample Example 
 * get http://localhost/events
 * get http://localhost/users?sort=asc&eventDate=204-12-24
 *
 * @apiSuccessStructure FindMultipleSuccess
 */
// ------------------------------------------------------------------------------------------
// Fetch all from user
//
//  Description:    Search events from a user. Redirect to GET /events and add a field for
//                  the author filter.
//  Task:           EventController.findFromUser()
// ------------------------------------------------------------------------------------------
/**
 * @-api {get} /users/:id/events Find user's events
 * @-apiName FindMultipleUserEvents
 * @-apiGroup Events
 * @-apiPermission authenticated
 * @-apiDescription @todo
 *
 * @todo params
 * @todo example
 *
 * @-apiSuccessStructure FindMultipleSuccess
 */
// ------------------------------------------------------------------------------------------
// Create
//
//  - EventController.create()
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /users/:id/events Create an event
 * @apiName CreateEvent
 * @apiGroup Events
 * @apiPermission authenticated
 * @apiDescription Create an event which is retrieve if creation was a success.
 * <br/><b>Throw error:</b> 400.
 *
 * @apiParam (dataParam) {String} name
 * @apiParam (dataParam) {String} [description]
 * @apiParam (dataParam) {String} [place]
 * @apiParam (dataParam) {String} date
 * @apiExample Use example
 * post http://localhost/events
 * form-data: name=MyEvent&date=2014-12-24
 *
 * @apiSuccessStructure CreateSuccess
 *
 * @apiErrorStructure BadRequestError
 */
// ------------------------------------------------------------------------------------------
// Update
//
// EventController.update()
// ------------------------------------------------------------------------------------------
/**
 * @api {put} /events Update an event
 * @apiName UpdateEvent
 * @apiGroup Events
 * @apiPermission authenticated eventOwner
 * @apiDescription update an event
 * <br/><b>Throw error:</b> 400.
 *
 * @apiParam (dataParam) {String} name
 * @apiParam (dataParam) {String} [description] A token is required to update password.
 * @apiParam (dataParam) {String} [place] Required token to update password.
 * @apiParam (dataParam) {String} date
 * @apiExample Use example
 * put http://localhost/events
 * form-data: description=My_will_such_as_hell&place=toHome
 *
 * @apiSuccessStructure UpdateSuccess
 *
 */

// ------------------------------------------------------------------------------------------
// Delete one
//
//  - EventController.delete()
// ------------------------------------------------------------------------------------------

/**
 * @api {delete} /users/:id/events/:id Delete an Event
 * @apiName DeleteEvent
 * @apiGroup Events 
 * @apiPermission authenticated eventOwner
 * @apiDescription Delete an event
 * <br/><b>Throw error:</b> 404.
 *
 * @apiParam {Number} id Event's ID
 * @apiExample Use example
 * delete http://localhost/events/15
 *
 * @apiSuccessStructure DeleteSuccess
 */
// ------------------------------------------------------------------------------------------

//                                      Invitation

// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// Create an event invitation
//
//  - InvitationController.create()
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /events/:id/invitations Create an event invitation
 * @apiName CreateEventInvitation
 * @apiGroup Events
 * @apiPermission authenticated author
 * @apiDescription Create one event invitation.
 * <br/><b>Throw error:</b> 400.
 *
 * @apiParam (urlParam) {Number} id Event's ID
 * @apiParam (dataParam) {Number} target_id
 * @apiExample Use example
 * post http://localhost/events/15/invitations
 * form-data: target_id=36
 *
 * @apiSuccessStructure CreateSuccess
 * @todo
 */
// ------------------------------------------------------------------------------------------
// Find one event invitation
//
//  - InvitationController.find()
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /events/:id_event/invitations/:id_invitation Find an event invitation
 * @apiName FindEventInvitation
 * @apiGroup Events
 * @apiPermission authenticated author
 * @apiDescription Find and event invitation.
 * <br/><b>Throw error:</b> 404.
 *
 * @apiParam (urlParam) {Number} id_event Event's ID
 * @apiParam (urlParam) {Number} id_invitation Invitation's ID
 * @apiExample Use example
 * post http://localhost/events/15/invitations/15
 *
 * @apiSuccessStructure FindSuccess
 * @todo
 */
// ------------------------------------------------------------------------------------------
// Find event invitations
//
//  - InvitationController.findMultiple()
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /events/:id_event/invitations/ Find event invitations
 * @apiName FindEventInvitations
 * @apiGroup Events
 * @apiPermission authenticated author
 * @apiDescription Find event invitations.
 * <br/><b>Throw error:</b> 404.
 *
 * @apiParam (urlParam) {Number} id_event Event's ID
 * @apiExample Use example
 * post http://localhost/events/15/invitations
 *
 * @apiSuccessStructure FindMultipleSuccess
 * @todo
 */
// ------------------------------------------------------------------------------------------
// Update a project invitation
//
//  Description:    Allow accept/cancel/..
//                  Note that target can cancel/accept and sender can only cancel
//  Task:           InvitationController.update()
// ------------------------------------------------------------------------------------------
/**
 * @api {put} /events/:id/invitations Update an event invitation
 * @apiName UpdateEventInvitation
 * @apiGroup Events
 * @todo
 */
// ------------------------------------------------------------------------------------------
// Delete a project invitation
//
//  Description:
//  Task:           InvitationController.delete()
// ------------------------------------------------------------------------------------------
/**
 * @api {delete} /events/:id/invitations Delete an event invitation
 * @apiName DeleteEventInvitation
 * @apiGroup Events
 * @todo
 */
// ------------------------------------------------------------------------------------------
//
//                                      Members
//
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// Remove one project's member
//
//  - EventController.deleteMember()
// ------------------------------------------------------------------------------------------
/**
 * @api {delete} /events/:id/members/:id Delete an event member
 * @apiName DeleteEventMember
 * @apiGroup Events
 * @todo
 */
// ------------------------------------------------------------------------------------------
// Fetch multiple project's members
//
//  - UserController.findProjectMembers()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /events/:id/members Find event members
 * @apiName FindEventMembers
 * @apiGroup Events
 * @todo
 */
// ------------------------------------------------------------------------------------------
// Fetch one project members
//
//  - UserController.findProjectMember()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /events/:id/members/:id Find an event member
 * @apiName FindEventMember
 * @apiGroup Events
 * @todo
 */