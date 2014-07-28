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
 * @apiHeaderStructure MyHeader
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
// Create
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /events Create an event
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
 * @api {put} /users Update an event
 * @apiName UpdateEvent
 * @apiGroup Events
 */

/**
 * @api {delete} /events Delete an Event
 * @apiName DeleteEvent
 * @apiGroup Events
 */