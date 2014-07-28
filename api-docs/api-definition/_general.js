// ------------------------------------------------------------------------------------------
// Current Success.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefineSuccessStructure FindSuccess
 * @apiSuccessTitle (200) Success (200)
 * @apiSuccess (200) {Object} object L'objet recherché.
 * @apiSuccess (200) {String} status 200.
 * @apiSuccessExample Réponse (exemple):
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
 * @apiDefineSuccessStructure CreateSuccess
 * @apiSuccessTitle (201) Created (201)
 * @apiSuccess (201) {Object} object L'objet crée.
 * @apiSuccess (201) {String} status 201.
 * @apiSuccessExample Réponse (exemple):
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
 * @apiSuccess {Object} object L'objet mis à jour.
 * @apiSuccess {String} status 200.
 */

/**
 * @apiDefineSuccessStructure DeleteSuccess
 * @apiSuccess {String} status 204.
 */

/**
 * @apiDefineStructure MyName
 * @apiParam {Number} id Users unique ID.
 * @apiParam {Number} qsd Users unique ID.
 */

// ------------------------------------------------------------------------------------------
// Current Errors.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefineErrorStructure NotFoundError
 * @apiErrorTitle (404) Not found (404)
 * @apiError (404) {Object[]} error Objet erreur.
 * @apiError (404) {String} error.message Message résumé de l'erreur.
 * @apiError (404) {String} error.code Code descriptif de l'erreur.
 * @apiErrorExample Réponse (exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "This user doesn't exist",
 *          "code": "modelNotFound"
 *       },
 *       "status": "404"
 *     }
 */

/**
 * @apiDefineStructure ServerError
 * @apiParamTitle (Erreur serveur (500)) Erreur serveur (500)
 * @apiError (Erreur serveur (500)) {Object[]} sdfsdf Objet erreur.
 *
 * @apiExample (ServerError) Réponse (exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "This user doesn't exist",
 *          "code": "modelNotFound"
 *       },
 *       "status": "404"
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


// ------------------------------------------------------------------------------------------
// Errors codes.
// ------------------------------------------------------------------------------------------
/**
 * @api {} Code erreurs
 * @apiName qsd
 * @apiGroup Errors
 *
 *
 * @apiHeaderTitle (Errors) Code d'erreurs.
 * @apiHeader (Errors) {String} error
 * @apiHeader (Errors) {String} error.code
 * @apiHeader (Errors) {String} error.code.errormodelNotFound Le model / classe recherché(e) n'a pas été trouvé(e).
 * @apiHeader (Errors) {String} error.code.pageNotFound La page demandée n'a pas été trouvée.
 */