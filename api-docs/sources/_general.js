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
 * @apiSuccessTitle (201) Success (201 Created) response parameters
 * @apiSuccessTitle (204) Success (204 No content) response parameters
 */

/**
 * @apiDefineSuccessStructure FindSuccess
 * @apiSuccess (200) {Object} object Requested object.
 * @apiSuccessExample Success (200 OK) response sample:
 *     HTTP/1.1 200 OK
 *     {
 *       "object": {
 *          "field1": "Foo",
 *          "field2": "Bar",
 *          ...
 *       },
 *     }
 */

/**
 * @apiDefineSuccessStructure FindMultipleSuccess
 * @apiSuccess (200) {Object[]} objects The list of objects.
 * @apiSuccessExample Success (200 OK) response sample:
 *     HTTP/1.1 200 OK
 *     {
 *       "objects": [
 *          "object1": {
 *              "field1": "Foo",
 *              "field2": "Bar",
 *              ...
 *          },
 *          "object2": {
 *              "field1": "Foo",
 *              "field2": "Bar",
 *              ...
 *          },
 *          ...
 *       ],
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
 * @apiSuccess (201) {Object} object The created object.
 * @apiSuccessExample Success (201 Created) response sample:
 * HTTP/1.1 201 Created
 * {
 *     "object": {
 *         "field1": "Foo",
 *         "field2": "Bar",
 *         ...
 *     },
 * }
 */

/**
 * @apiDefineSuccessStructure UpdateSuccess
 * @apiSuccess (200) {Object} object The updated object.
 * @apiSuccessExample Success (200 OK) response sample:
 * HTTP/1.1 200 OK
 * {
 *     "object": {
 *         "field1": "Foo",
 *         "field2": "Bar",
 *         ...
 *     },
 * }
 */

 /**
  * @apiDefineSuccessStructure PatchSuccess
  * @apiSuccessExample Success (204 No content) response sample:
  * HTTP/1.1 204 No content
  * {
  * }
  */

/**
 * @apiDefineSuccessStructure DeleteSuccess
 * @apiSuccessExample Success (204 No content) response sample:
 * HTTP/1.1 204 No content
 * {
 * }
 */

// ------------------------------------------------------------------------------------------
// Errors definitions.
// ------------------------------------------------------------------------------------------
/**
 * @apiErrorTitle (400) Error (400 Bad request) response parameters
 * @apiErrorTitle (403) Error (403 Forbidden Error) response parameters
 * @apiErrorTitle (404) Error (404 Not found) response parameters
 * @apiErrorTitle (409) Error (409 Conflict) response parameters
 * @apiErrorTitle (500) Error (500 Server Error) response parameters
 */

/**
 * @apiDefineErrorStructure CommonError
 * @apiErrorTitle (errorResponse) Response attributes
 * @apiError (errorResponse) {String} message Error message.
 * @apiError (errorResponse) {String} [description] More detailed error message.
 * @apiError (errorResponse) {String} code Error code (Check the section above).
 * @apiError (errorResponse) {Object[]} [params] The parameters the error relates to if the error is parameter-specific.
 * @apiError (errorResponse) {Object[]} params.field The field name relatives to error.
 * @apiError (errorResponse) {String} params.field.code The code error.
 * @apiError (errorResponse) {String} params.field.message
 * @apiError (errorResponse) {String} [params.field.description]
 * @apiError (errorResponse) {String} [params.field.value]
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
 *          "field1": [
 *              {
 *                  "message": "This field should contain at least 4 characters",
 *                  "description": "This field should contain at least 4 characters motherfucker !!!",
 *                  "code": "fieldTooShort"
 *                  "value": "foo"
 *              }
 *          ],
 *          ...
 *       ],
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
 *     }
 */

/**
 * @apiDefineErrorStructure forbiddenError
 * @apiErrorExample Error (401 Unauthorized Error) response sample (case of authentication parameters are missing):
 *     HTTP/1.1 401 Unauthorized Error
 *     {
 *       "message": "You are not authorized",
 *       "code": "unauthorized"
 *     }
 */

/**
 * @apiDefineErrorStructure forbiddenError
 * @apiErrorExample Error (403 Forbidden Error) response sample:
 *     HTTP/1.1 403 Forbidden Error
 *     {
 *       "message": "You do not have enough rights to access this resource",
 *       "code": "noAccessRights"
 *     }
 */

/**
 * @apiDefineErrorStructure unauthorizedError
 */

// 409 Conflict
/**
 * @apiDefineErrorStructure ConflictError
 * @apiErrorExample Error (409 Conflict Error) response sample:
 *     HTTP/1.1 409 Conflict Error
 *     {
 *       "message": "Email already taken",
 *       "description": "foo",
 *       "code": "emailArleadyTaken"
 *     }
 */

/**
 * @apiDefineErrorStructure serverError
 * @apiErrorExample Error (500 Serveur Error) response sample:
 *     HTTP/1.1 500 Serveur Error
 *     {
 *       "message": "Database unavailable",
 *       "code": "dbUnavailable"
 *     }
 */



// ------------------------------------------------------------------------------------------
// Current Permissions.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefinePermission admin Admin access rights needed.
 */
/**
 * @apiDefinePermission guest Guest access rights needed.
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
