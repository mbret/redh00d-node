// ------------------------------------------------------------------------------------------
// Fetch one
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users/:id Chercher un utilisateur par ID
 * @apiName FindUser
 * @apiGroup Users
 * @apiGroupDescription API relative aux utilisateurs
 *
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
 * @apiName FindMultipleUsers
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
 * @apiName CreateUser
 * @apiGroup Users
 * @apiDescription Créer un utilisateur et le récupère.
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
 *
 * @apiErrorStructure BadRequestError
 * @apiErrorExample Answer (email taken sample):
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *       "message": "This email was already taken",
 *       "code": "emailArleadyTaken",
 *       "status": "400"
 *     }
 *
 */
// ------------------------------------------------------------------------------------------
// Update one
// ------------------------------------------------------------------------------------------
/**
 * @api {put} /users Mettre à jour un utilisateur
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiDescription Mets à jour un utilisateur et le récupère.
 *
 * @apiParamTitle (formData) Parameters (Form Data)
 * @apiParam (formData) {String} email
 * @apiParam (formData) {String} [firstname]
 * @apiParam (formData) {String} [lastname]
 * @apiExample Example d'utilisation
 * put http://localhost/users
 * form-data: email=xmax54%40gmail.com&firstname=pascal
 *
 * @apiSuccessStructure UpdateSuccess
 *
 * @apiErrorStructure BadRequestError
 *
 */
// ------------------------------------------------------------------------------------------
// Delete one
// ------------------------------------------------------------------------------------------
/**
 * @api {delete} /users/:id Supprimer un utilisateur
 * @apiName DeleteUser
 * @apiGroup Users
 *
 */
// ------------------------------------------------------------------------------------------
// Fetch events from one user
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users/:id/events Chercher les événements d'un utilisateur
 * @apiName FindUserEvents
 * @apiGroup Users
 *
 */
// ------------------------------------------------------------------------------------------
// Delete events from one user
// ------------------------------------------------------------------------------------------
/**
 * @api {delete} /users/:id/events Supprimer les événements d'un utilisateur
 * @apiName DeleteUserEvents
 * @apiGroup Users
 *
 */