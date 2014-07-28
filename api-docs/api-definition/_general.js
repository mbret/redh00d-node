// ------------------------------------------------------------------------------------------
// Success definitions.
// ------------------------------------------------------------------------------------------
/**
 * @apiSuccessTitle (200) Success (200 - OK)
 * @apiSuccessTitle (201) Success (201 - CREATED)
 */
/**
 * @apiDefineSuccessStructure FindSuccess
 * @apiSuccess (200) {Object} object L'objet recherché.
 * @apiSuccess (200) {String} status 200.
 * @apiSuccessExample Answer (sample):
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
 * @apiSuccess (200) {Object[]} data La liste des objets.
 * @apiSuccess (200) {String} status 200.
 * @apiSuccessExample Answer (sample):
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
 * @apiSuccessExample Answer (empty sample):
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
 * @apiSuccessExample Answer (sample):
 *     HTTP/1.1 201 CREATED
 *     {
 *       "object": {
 *          "field1": "Foo",
 *          "field2": "Bar",
 *          ...
 *       },
 *       "status": 201
 *     }
 */

/**
 * @apiDefineSuccessStructure UpdateSuccess
 * @apiSuccess (200) {Object} object L'objet modifié.
 * @apiSuccess (200) {String} status 200.
 * @apiSuccessExample Answer (sample):
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
 * @apiDefineSuccessStructure DeleteSuccess
 * @apiSuccess {String} status 204.
 */

// ------------------------------------------------------------------------------------------
// Errors definitions.
// ------------------------------------------------------------------------------------------
/**
 * @apiErrorTitle (400) Error (400 - Bad request)
 * @apiErrorTitle (403) Error (403 - Forbidden Error)
 * @apiErrorTitle (404) Error (404 - NOT FOUND)
 * @apiErrorTitle (500) Error (500 - Server Error)
 */

/**
 * @apiDefineErrorStructure BadRequestError
 * @apiError (400) {String} message Message de l'erreur.
 * @apiError (400) {String} code Code de l'erreur.
 * @apiError (400) {String} status 400.
 * @apiError (400) {Object[]} [errors] Erreurs supplémentaire. Ici les champs contenu dans Form Data.
 * @apiErrorExample Answer (validation params fail sample):
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *       "message": "The requested parameters are not correct",
 *       "code": "invalidParams"
 *       "errors": [
 *          {
 *            "message": "You should fill this field",
 *            "code": "fieldEmpy"
 *            "field": "name"
 *          },
 *          ...
 *       ],
 *       "status": "400"
 *     }
 */

/**
 * @apiDefineErrorStructure NotFoundError
 * @apiError (404) {String} message Message de l'erreur.
 * @apiError (404) {String} code Code de l'erreur.
 * @apiErrorExample Answer (sample):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "This user doesn't exist",
 *       "code": "modelNotFound"
 *       "status": "404"
 *     }
 */

/**
 * @apiDefineErrorStructure forbiddenError
 * @apiError (403) {String} message Message de l'erreur.
 * @apiError (403) {String} code Code de l'erreur.
 * @apiErrorExample Answer (sample):
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
 * @apiError (500) {String} message Message de l'erreur.
 * @apiError (500) {String} code Code de l'erreur.
 * @apiErrorExample Answer (sample):
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
 *
 */

/**
 * @apiDefinePermission authenticated Authentification requise.
 *
 */


// ------------------------------------------------------------------------------------------
// Header definitions.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefineHeaderStructure MyHeader
 * @apiHeader {String} [Accept-Language=Locale du navigateur] Langue de retour demandée. Exemple : fr-FR.
 */


