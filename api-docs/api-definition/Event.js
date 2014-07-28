
/**
 * @api {get} /events/:id Chercher un événement par ID
 * @apiName GetEvent
 * @apiGroup Events
 *
 * @apiHeaderStructure MyHeader
 *
 * @apiParamTitle (urlParam) Parameter (URL)
 * @apiParam (urlParam) {Number} id ID événement.
 * @apiExample Example d'utilisation
 * get http://localhost/events/15
 *
 * @apiSuccessStructure FindSuccess
 * @apiErrorStructure NotFoundError
 */

/**
 * @api {post} /events Modifier un événement
 * @apiName UpdateEvent
 * @apiGroup Events
 *
 * @apiHeaderStructure MyHeader
 *
 * @apiParamTitle (dataParam) Parameter (Form Data)
 * @apiParam (dataParam) {Number} name ID événement.
 * @apiParam (dataParam) {Number} place ID événement.
 * @apiParam (dataParam) {Number} description ID événement.
 * @apiParam (dataParam) {Number} date ID événement.
 * @apiExample Example d'utilisation
 * get http://localhost/events
 * Form data : name=event&description=One+event&place=toul&date=2014-07-25...
 *
 * @apiSuccessStructure CreateSuccess
 */

/**
 * @api {delete} /events Supprimer un événement
 * @apiName DeleteEvent
 * @apiGroup Events
 */