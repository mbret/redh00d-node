// ------------------------------------------------------------------------------------------
// Success definitions.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefineSuccessStructure FindSuccess
 * @apiSuccessTitle (200) Success (200 - OK)
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
 * @apiSuccessTitle (200) Success (200 - OK)
 * @apiSuccess (200) {Object[]} data La liste des objets.
 * @apiSuccess (200) {String} status 200.
 * @apiSuccessExample Answer (sample):
 *     HTTP/1.1 200 OK
 *     {
 *       "data": [
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
 *       "data": [ ],
 *       "status": 200
 *     }
 */

/**
 * @apiDefineSuccessStructure CreateSuccess
 * @apiSuccessTitle (201) Success (201 - CREATED)
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
 * @apiSuccessTitle (201) Success (200 - OK)
 * @apiSuccess (201) {Object} object L'objet modifié.
 * @apiSuccess (201) {String} status 200.
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
 * @apiDefineErrorStructure NotFoundError
 * @apiErrorTitle (404) Error (404 - NOT FOUND)
 * @apiError (404) {Object[]} errors Contenu de(s) erreur(s).
 * @apiError (404) {String} errors.message Message de l'erreur.
 * @apiError (404) {String} errors.code Code de l'erreur.
 * @apiErrorExample Answer (sample):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "errors": {
 *          "message": "This user doesn't exist",
 *          "code": "modelNotFound"
 *       },
 *       "status": "404"
 *     }
 */

/**
 * @apiDefineErrorStructure forbiddenError
 * @apiErrorTitle (403) Error (403 - Forbidden Error)
 * @apiError (403) {Object[]} errors Contenu de(s) erreur(s).
 * @apiError (403) {String} errors.message Message de l'erreur.
 * @apiError (403) {String} errors.code Code de l'erreur.
 * @apiErrorExample Answer (sample):
 *     HTTP/1.1 403 Forbidden Error
 *     {
 *       "errors": {
 *          "message": "You do not have enough rights to access this resource",
 *          "code": "noAccessRights"
 *       },
 *       "status": "403"
 *     }
 */

/**
 * @apiDefineErrorStructure authorizationError
 */

/**
 * @apiDefineErrorStructure serverError
 * @apiErrorTitle (500) Error (500 - Server Error)
 * @apiError (500) {Object[]} errors Contenu de(s) erreur(s).
 * @apiError (500) {String} errors.message Message de l'erreur.
 * @apiError (500) {String} errors.code Code de l'erreur.
 * @apiErrorExample Answer (sample):
 *     HTTP/1.1 500 Serveur Error
 *     {
 *       "errors": {
 *          "message": "Database unavailable",
 *          "code": "dbUnavailable"
 *       },
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
// Current Header.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefineHeaderStructure MyHeader
 * @apiHeader {String} [Accept-Language=Locale du navigateur] Langue de retour demandée. Exemple : fr-FR.
 */


