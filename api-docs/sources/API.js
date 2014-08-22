/**
 * @api {} Summary
 * @apiName Summary
 * @apiGroup API
 * @apiGroupDescription
 * Welcome to the redh00d API also called Web Service. This documentation will list all the available methods to interract with database.
 * <br/>Please read all section to understand. If you get an error response you can refer to the error section.
 * <br/><b>The web service is now under development, means that some method may have changed or may not be correctly functionnal.</b>
 * <p>

 * @apiDescription
 * HTTP Status Code Summary:</b>
 *    <br/><b>200 OK</b> - Everything worked as expected.
 *    <br/><b>400 Bad Request</b> - Often missing a required parameter. The client SHOULD NOT repeat the request without modifications.
 *    <br/><b>401 Unauthorized</b> - No valid API key provided.
 *    <br/><b>402 Request Failed</b> - Parameters were valid but request failed.
 *    <br/><b>403 Forbidden</b> - The server understood the request, but is refusing to fulfill it. Authorization will not help and the request SHOULD NOT be repeated.
 *    <br/><b>405 Method not allowed</b> - Used to indicate that the requested URL exists, but the requested HTTP method is not applicable. For example, POST /users/12345 where the API doesn't support creation of resources this way (with a provided ID).
 *    <br/><b>404 Not Found</b> - The requested item doesn't exist.
 *    <br/><b>409 Conflict</b> - Whenever a resource conflict would be caused by fulfilling the request. Duplicate entries, such as trying to create two customers with the same information, and deleting root objects when cascade-delete is not supported are a couple of examples.
 *    <br/><b>500, 502, 503, 504 Server errors</b> - any general error on the system.
 * </p>
 * <hr/>
 * <p>
 *    <b>Password salt:</b> MojoTime
 *    <br/>Put this salt at the end of the clear password and then hash with md5.
 * </p>
 */

/**
 * @api {} Authentication
 * @apiName Authenticate
 * @apiGroup API
 * @apiDescription The authentication to the api is using "Basic Auth". So just put username/password inside each request to be authenticated.
 * <br/>The api try to be as REST as possible. The aim is to be RESTful. It means that there are no states (sessions) on server side. Each request is unique and has to hold
 * everything needed like user username/credential.
 *
 * @apiSuccessTitle (authRequest) Basic Auth parameters
 * @apiSuccess (authRequest) username
 * @apiSuccess (authRequest) password
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
 *
 * @apiSuccessExample Use example:
 * Request Header:
 * ---------------
 * GET /api/events HTTP/1.1
 * Host: 109.31.47.142:3000/api:1337
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
