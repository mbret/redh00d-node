
/**
 * @api {} Détail des codes erreurs
 * @apiName ErroCode
 * @apiGroup Errors
 *
 * @apiHeaderTitle (Errors) Code d'erreurs.
 * @apiHeader (Errors) {String} error
 * @apiHeader (Errors) {String} error.code
 * @apiHeader (Errors) {String} error.code.resourceNotFound La ressource recherchée n'a pas été trouvée.
 * @apiHeader (Errors) {String} error.code.modelNotFound Le model / classe recherché(e) n'a pas été trouvé(e).
 * @apiHeader (Errors) {String} error.code.pageNotFound La page demandée n'a pas été trouvée.
 *
 */

/**
 * @api {} Erreur 401
 * @apiName Error401
 * @apiGroup Errors
 *
 * @apiErrorStructure authorizationError
 */

/**
 * @api {} Erreur 403
 * @apiName Error403
 * @apiGroup Errors
 * @apiDescription The request is understood, but it has been refused or access is not allowed. An accompanying error message will explain why.
 * @apiErrorStructure forbiddenError
 */

/**
 * @api {} Erreur 500
 * @apiName Error500
 * @apiGroup Errors
 *
 * @apiErrorStructure serverError
 */

