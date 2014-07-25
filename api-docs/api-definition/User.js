/**
 * @api {get} /users/:id Cherche un utilisateur par ID
 * @apiName Find
 * @apiGroup Users
 * @apiPermission authenticated
 * @apiDescription Cherche un utilisateur par ID
 *
 * @apiHeaderStructure MyHeader
 *
 * @apiParam {Number} id ID utilisateur.
 * @apiExample Example d'utilisation
 * get http://localhost/users/15
 *
 * @apiStructure MyName
 * @apiSuccessStructure FindSuccess
 *
 * @apiErrorStructure NotFoundError
 */

/**
 * @api {post} /users Créer un utilisateur
 * @apiName Create
 * @apiGroup Users
 *
 * @apiParam {Number} id ID utilisateur.
 *
 * @apiSuccess {Object} user Utilisateur.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *          "firstname": "Maxime",
 *          "lastname": "Bret",
 *          "email": "xmax54@gmail.com"
 *       },
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */