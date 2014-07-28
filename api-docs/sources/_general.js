// ------------------------------------------------------------------------------------------
// Parameters definitions.
// ------------------------------------------------------------------------------------------
/**
 * @apiParamTitle (urlParam) Parameters (URL)
 * @apiParamTitle (dataParam) Parameters (Form Data)
 */
// ------------------------------------------------------------------------------------------
// Success definitions.
// ------------------------------------------------------------------------------------------
/**
 * @apiSuccessTitle (200) Success (200 OK) response parameters
 * @apiSuccessTitle (201) Success (201 CREATED) response parameters
 * @apiSuccessTitle (204) Success (204 NO CONTENT) response parameters
 */

/**
 * @apiDefineSuccessStructure FindSuccess
 * @apiSuccess (200) {Object} object Requested object.
 * @apiSuccess (200) {String} status 200.
 * @apiSuccessExample Success (200 OK) response sample:
 *     HTTP/1.1 200 OK
 *     {
 *       "object": {
 *          "field1": "Foo",
 *          "field2": "Bar",
 *          ...
 *       },
 *       "status": 200
 *     }
 */

/**
 * @apiDefineSuccessStructure FindMultipleSuccess
 * @apiSuccess (200) {Object[]} objects La liste des objets.
 * @apiSuccess (200) {String} status 200.
 * @apiSuccessExample Success (200 OK) response sample:
 *     HTTP/1.1 200 OK
 *     {
 *       "objects": [
 *          "object": {
 *              "field1": "Foo",
 *              "field2": "Bar",
 *              ...
 *          },
 *          ...
 *       ],
 *       "status": 200
 *     }
 * @apiSuccessExample Success (200 OK) response sample (case of empty):
 *     HTTP/1.1 200 OK
 *     {
 *       "objects": [ ],
 *       "status": 200
 *     }
 */

/**
 * @apiDefineSuccessStructure CreateSuccess
 * @apiSuccess (201) {Object} object L'objet crée.
 * @apiSuccess (201) {String} status 201.
 * @apiSuccessExample Success (201 CREATED) response sample:
 * HTTP/1.1 201 CREATED
 * {
 *     "object": {
 *         "field1": "Foo",
 *         "field2": "Bar",
 *         ...
 *     },
 *     "status": 201
 * }
 */

/**
 * @apiDefineSuccessStructure UpdateSuccess
 * @apiSuccess (200) {Object} object L'objet modifié.
 * @apiSuccess (200) {String} status 200.
 * @apiSuccessExample Success (200 OK) response sample:
 * HTTP/1.1 200 OK
 * {
 *     "object": {
 *         "field1": "Foo",
 *         "field2": "Bar",
 *         ...
 *     },
 *     "status": 200
 * }
 */

/**
 * @apiDefineSuccessStructure DeleteSuccess
 * @apiSuccess (204) {String} status 204.
 * @apiSuccessExample Success (204 NO CONTENT) response sample:
 * HTTP/1.1 204 NO CONTENT
 * {
 *     "status": 204
 * }
 */

// ------------------------------------------------------------------------------------------
// Errors definitions.
// ------------------------------------------------------------------------------------------
/**
 * @apiErrorTitle (400) Error (400 Bad request) response parameters
 * @apiErrorTitle (403) Error (403 Forbidden Error) response parameters
 * @apiErrorTitle (404) Error (404 NOT FOUND) response parameters
 * @apiErrorTitle (500) Error (500 Server Error) response parameters
 */

/**
 * @apiDefineErrorStructure CommonError
 * @apiErrorTitle (errorResponse) Response attributes
 * @apiError (errorResponse) {String} message Error message.
 * @apiError (errorResponse) {String} [description] More detailed error message.
 * @apiError (errorResponse) {String} code Error code (Check the section above).
 * @apiError (errorResponse) {String} status 400, 401, 500, ...
 * @apiError (errorResponse) {Object[]} [params] The parameters the error relates to if the error is parameter-specific.
 * @apiError (errorResponse) {Object[]} params.field The field name relatives to error.
 * @apiError (errorResponse) {Object[]} params.code The code error.
 * @apiError (errorResponse) {Object[]} params.message .
 * @apiError (errorResponse) {Object[]} [params.description] .
 */
// 400 Bad Request
/**
 * @apiDefineErrorStructure BadRequestError
 * @apiErrorExample Error (400 Bad request) response sample (case of parameters validation failed):
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *       "message": "The requested parameters are not correct",
 *       "code": "invalidParams"
 *       "params": [
 *          {
 *            "message": "This field should contain at least 4 characters",
 *            "code": "fieldTooShort"
 *            "field": "foo"
 *          },
 *          ...
 *       ],
 *       "status": "400"
 *     }
 */
/**
 * @apiDefineErrorStructure BadRequestErrorEmailTaken
 * @apiErrorExample Error (400 Bad request) response sample (email taken case):
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *       "message": "This email was already taken",
 *       "code": "emailArleadyTaken",
 *       "status": "400"
 *     }
 */
// 404 Not Found
/**
 * @apiDefineErrorStructure NotFoundError
 * @apiErrorExample Error (404 Not Found) response sample:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "This user doesn't exist",
 *       "code": "modelNotFound"
 *       "status": "404"
 *     }
 */

/**
 * @apiDefineErrorStructure forbiddenError
 * @apiErrorExample Error (403 Forbidden Error) response sample:
 *     HTTP/1.1 403 Forbidden Error
 *     {
 *       "message": "You do not have enough rights to access this resource",
 *       "code": "noAccessRights"
 *       "status": "403"
 *     }
 */

/**
 * @apiDefineErrorStructure authorizationError
 */

/**
 * @apiDefineErrorStructure serverError
 * @apiErrorExample Error (500 Serveur Error) response sample:
 *     HTTP/1.1 500 Serveur Error
 *     {
 *       "message": "Database unavailable",
 *       "code": "dbUnavailable"
 *       "status": "500"
 *     }
 */



// ------------------------------------------------------------------------------------------
// Current Permissions.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefinePermission admin Admin access rights needed.
 */
/**
 * @apiDefinePermission authenticated Authentication requiered
 */
/**
 * @apiDefinePermission author Is author.
 */
/**
 * @apiDefinePermission accountOwner Is author.
 */

// ------------------------------------------------------------------------------------------
// Header definitions.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefineHeaderStructure MyHeader
 * @apiHeader {String} [Accept-Language=Locale du navigateur] Langue de retour demandée. Exemple : fr-FR.
 */


