// ------------------------------------------------------------------------------------------
// Fetch
// 
/**
 * @api {get} /events/:id Look for an event given by ID
 * @apiName FindEvent
 * @apiGroup Events
 * @apiGroupDescription API corresponding to Event
 *
 * @apiPermission authenticated
 * @apiDescription Look for an event given by ID
 *
 * @apiHeaderStructure MyHeader
 *
 * @apiParam {Number} id ID Events.
 * @apiExample Example 
 * get http://localhost/events/15 look for event 15
 *
 * @apiSuccessStructure FindSuccess
 * @apiErrorStructure NotFoundError
 *
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
 * @apiDescription update an event which is retrieved if updating was correctly done
 *
 * @apiParam (formData) {Number} eventID
 * @apiParam (formData) {String} [name]
 * @apiParam (formData) {String} [description]
 * @apiParam (formData) {String} [place]
 * @apiParam (formData) {String} [date]
 * @apiExample Example d'utilisation
 * put http://localhost/event
 * form-data: eventID=1&date=2014-01-05
 *
 * @apiSuccessStructure UpdateSuccess
 *
 * @apiErrorStructure BadRequestError
 *
 */

/**
 * @api {delete} /events Delete an Event
 * @apiName DeleteEvent
 * @apiGroup Events
 */