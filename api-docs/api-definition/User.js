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
 * @apiSuccessStructure FindSuccess
 * @apiErrorStructure NotFoundError
 */

/**
 * @api {get} /users Cherche des utilisateurs
 * @apiName FindMultiple
 * @apiGroup Users
 * @apiPermission authenticated
 * @apiDescription Cherche des utilisateurs
 *
 * @apiHeaderStructure MyHeader
 *
 * @apiExample Example d'utilisation
 * get http://localhost/users
 *
 * @apiSuccessStructure FindMultipleSuccess
 */

/**
 * @api {post} /users Créer un utilisateur
 * @apiName Create
 * @apiGroup Users
 *
 * @apiParam {Number} id ID utilisateur.
 *
 * @apiSuccessStructure CreateSuccess
 *
 */

/**
 * @api {post} /users Modifier un utilisateur
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiSuccessStructure UpdateSuccess
 */