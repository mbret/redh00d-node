/**
 * @api {} Authentication
 * @apiName Authenticate
 * @apiGroup API
 *
 */

/**
 * @api {} Header parameters
 * @apiName HeaderParams
 * @apiGroup API
 * @apiDescription The header of all your request to the API has to / may include some useful parameters.
 *
 * @apiSuccessTitle (headerRequest) Header request parameters
 * @apiSuccess (headerRequest) {String} [Accept-Language=Locale du navigateur] Langue de retour demandée. Exemple : fr-FR.
 * @apiSuccess (headerRequest) {String} [auth_api_key] Use your api key with email to be authenticate. If no api key are provided then you act as a guest.
 * @apiSuccess (headerRequest) {String} [auth_email] Use you email with api key to be authenticate. If no email are provided then you act as a guest.
 * @apiSuccessExample Use example:
 * Request Header:
 * ---------------
 * GET /api/events HTTP/1.1
 * Host: localhost:1337
 * Accept-Language: fr-FR
 * ...
 *
 * @apiErrorTitle (headerResponse) Header response parameters
 * @apiError (headerResponse) {String} test qsd
 * @apiErrorExample Response sample:
 * Response Header:
 * ---------------
 * ...
 */