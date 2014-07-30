// ------------------------------------------------------------------------------------------
//                                      Events
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// Shortcut for fetch events params
// ------------------------------------------------------------------------------------------
/**
 * @apiDefineStructure fetchEventsParams
 * @apiParam (urlParam) {String} [eventName]
 * @apiParam (urlParam) {String} [eventDate]
 * @apiParam (urlParam) {String} [sort] get the result sorted
 */




/**
 * @api {get} /events/:id Cherche un événement par ID
 * @apiName GetUser
 * @apiGroup Events
 * @apiGroupDescription API corresponding to Event
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
// ------------------------------------------------------------------------------------------
// Fetch all
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /events look for Events
 * @apiName FindMultipleEvents
 * @apiGroup Events
 * @apiPermission authenticated
 * @apiDescription look for Events
 *
 *
 * @apiParamTitle (url) Parameters (URL)
 * @apiParam (url) {Number} [id]
 * @apiParam (url) {String} [eventName]
 * @apiParam (url) {String} [eventDate]
 * @apiParam (url) {String} [sort] get the result sorted
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
 * @api {get} /users/:id/events look for Events from a user
 * @apiName FindMultipleUserEvents
 * @apiGroup Events
 * @apiPermission authenticated
 * @apiDescription @todo
 *
 * @todo params
 * @todo example
 *
 * @apiSuccessStructure FindMultipleSuccess
 */
// ------------------------------------------------------------------------------------------
// Create
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /users/:id/events Create an event
 * @apiName CreateEvent
 * @apiGroup Events
 * @apiDescription Create an event which is retrieve if creation was a success.
 *
 * @apiParamTitle (formData) Parameters (Form Data)
 * @apiParam (formData) {String} name
 * @apiParam (formData) {String} [description]
 * @apiParam (formData) {String} [place]
 * @apiParam (formData) {String} date
 * @apiExample Example d'utilisation
 * post http://localhost/event
 * form-data: name=MyEvent&date=2014-12-24
 *
 * @apiSuccessStructure CreateSuccess
 *
 * @apiErrorStructure BadRequestError
 */
// ------------------------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------------------------
/**
 * @api {put} /users/:id/events Update an event
 * @apiName UpdateEvent
 * @apiGroup Events
 * @todo
 */

/**
 * @api {delete} /users/:id/events/:id Delete an Event
 * @apiName DeleteEvent
 * @apiGroup Events
 * @todo
 */
// ------------------------------------------------------------------------------------------
//                                      Members
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// Send a project invitation
//
//  - UserController.createProjectMemberInvitation()
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /events/:id/invitations Send event invitation
 * @apiName ToDo
 * @apiGroup Events
 * @todo
 */
// ------------------------------------------------------------------------------------------
// Update a project invitation
//
//  Description:    Allow accept/cancel/..
//                  Note that target can cancel/accept and sender can only cancel
//  Task:           UserController.updateProjectMemberInvitation()
// ------------------------------------------------------------------------------------------
/**
 * @api {put} /events/:id/invitations Update event invitation
 * @apiName ToDo
 * @apiGroup Events
 * @todo
 */
// ------------------------------------------------------------------------------------------
// Remove one project's member
//
//  - UserController.deleteProjectMember()
// ------------------------------------------------------------------------------------------
/**
 * @api {delete} /events/:id/members/:id Remove one user from an event
 * @apiName ToDo
 * @apiGroup Events
 * @todo
 */
// ------------------------------------------------------------------------------------------
// Fetch multiple project's members
//
//  - UserController.findProjectMembers()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /events/:id/members Find one project's member
 * @apiName ToDo
 * @apiGroup Events
 * @todo
 */
// ------------------------------------------------------------------------------------------
// Fetch one project members
//
//  - UserController.findProjectMember()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /events/:id/members/:id Find project's members
 * @apiName ToDo
 * @apiGroup Events
 * @todo
 */