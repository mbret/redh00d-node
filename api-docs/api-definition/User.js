// ------------------------------------------------------------------------------------------
// Fetch one
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users/:id Chercher un utilisateur par ID
 * @apiName Find
 * @apiGroup Users
 * @apiPermission authenticated
 * @apiDescription Chercher un utilisateur par ID
 *
 * @apiHeaderStructure MyHeader
 *
 * @apiParam {Number} id ID utilisateur.
 * @apiExample Example d'utilisation
 * get http://localhost/users/15
 *
 * @apiSuccessStructure FindSuccess
 * @apiErrorStructure NotFoundError
 */
// ------------------------------------------------------------------------------------------
// Fetch all
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users Chercher des utilisateurs
 * @apiName FindMultiple
 * @apiGroup Users
 * @apiPermission authenticated
 * @apiDescription Chercher des utilisateurs
 *
 * @apiHeaderStructure MyHeader
 *
 * @apiParamTitle (url) Parameters (URL)
 * @apiParam (url) {Number} [id]
 * @apiParam (url) {String} [firstname]
 * @apiParam (url) {String} [lastname]
 * @apiParam (url) {String} [sort] Avoir les resultats dans l'ordre descendant ou ascendant
 * @apiExample Example d'utilisation
 * get http://localhost/users
 * get http://localhost/users?sort=asc&firstname=maxime
 *
 * @apiSuccessStructure FindMultipleSuccess
 */
// ------------------------------------------------------------------------------------------
// Create one
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /users Créer un utilisateur
 * @apiName Create
 * @apiGroup Users
 *
 * @apiParamTitle (formData) Parameters (Form Data)
 * @apiParam (formData) {String} email
 * @apiParam (formData) {String} password
 * @apiParam (formData) {String} [firstname]
 * @apiParam (formData) {String} [lastname]
 * @apiExample Example d'utilisation
 * post http://localhost/users
 * form-data: email=xmax54%40gmail.com&password=password
 *
 * @apiSuccessStructure CreateSuccess
 * @apiErrorStructure BadRequestError
 * @apiErrorExample Answer (email taken sample):
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *       "errors": {
 *          "message": "This email was already taken",
 *          "code": "emailArleadyTaken"
 *       },
 *       "status": "400"
 *     }
 *
 */
// ------------------------------------------------------------------------------------------
// Update one
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /users Modifier un utilisateur
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiSuccessStructure UpdateSuccess
 */