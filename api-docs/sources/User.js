// ------------------------------------------------------------------------------------------
// Shortcut for fetch users params
// Include this structure if you need params used as filter
// ------------------------------------------------------------------------------------------
/**
 * @apiDefineStructure fetchUsersParams
 * @apiParam (urlParam) {Number} [id]
 * @apiParam (urlParam) {String} [firstname]
 * @apiParam (urlParam) {String} [lastname]
 * @apiParam (urlParam) {String} [firstname_sort] (asc/desc)
 * @todo write more here
 */


// ------------------------------------------------------------------------------------------
// Fetch one
//
//  - UserController.find()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users/:id Find one user
 * @apiName FindUser
 * @apiGroup Users
 * @apiGroupDescription API relatives to users
 * @apiDescription Find a user by its ID
 * <br/><b>Throw error:</b> 404
 *
 * @apiPermission authenticated
 *
 * @apiParam {Number} id User's ID
 * @apiExample Use example
 * get http://localhost/users/15
 *
 * @apiSuccessStructure FindSuccess
 */
// ------------------------------------------------------------------------------------------
// Fetch all
//
//  - UserController.findMultiple()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users Find users
 * @apiName FindMultipleUsers
 * @apiGroup Users
 * @apiPermission authenticated
 * @apiDescription Fetch users
 * <br/><b>Throw error:</b>
 *
 * @apiStructure fetchUsersParams
 * @apiExample Use example
 * get http://localhost/users
 * get http://localhost/users?sort=asc&firstname=maxime
 *
 * @apiSuccessStructure FindMultipleSuccess
 */
// ------------------------------------------------------------------------------------------
// Create one
//
//  - UserController.create()
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /users Create one user
 * @apiName CreateUser
 * @apiGroup Users
 * @apiPermission authenticated
 * @apiDescription Create one user and retrieve the created object.
 * <br/><b>Throw error:</b> 400, 409.
 *
 * @apiParam (dataParam) {String} email
 * @apiParam (dataParam) {String} password
 * @apiParam (dataParam) {String} [firstname]
 * @apiParam (dataParam) {String} [lastname]
 * @apiExample Use example
 * post http://localhost/users
 * form-data: email=xmax54%40gmail.com&password=password
 *
 * @apiSuccessStructure CreateSuccess
 *
 */
// ------------------------------------------------------------------------------------------
// Update one
//
//  Description:    Allow to change user data. Preference should be changed here.
//  Task:           UserController.update()
// ------------------------------------------------------------------------------------------
/**
 * @api {put} /users Update one user
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiPermission authenticated accountOwner
 * @apiDescription Mets à jour un utilisateur et le récupère. Pour mettre à jour le mot de passe, une génération préalable d'un token est requise.
 * le token doit ensuite être spécifié dans la requete.
 * <br/><b>Throw error:</b> 400.
 *
 * @apiParam (dataParam) {String} email
 * @apiParam (dataParam) {String} [password] A token is required to update password.
 * @apiParam (dataParam) {String} [password_token] Required token to update password.
 * @apiParam (dataParam) {String} [firstname]
 * @apiParam (dataParam) {String} [lastname]
 * @apiParam (dataParam) {String} [preference_foo] Change the preference foo
 * @apiExample Use example
 * put http://localhost/users
 * form-data: email=xmax54%40gmail.com&firstname=pascal
 *
 * @apiSuccessStructure UpdateSuccess
 *
 */
// ------------------------------------------------------------------------------------------
// Delete one
//
//  - UserController.delete()
// ------------------------------------------------------------------------------------------
/**
 * @api {delete} /users/:id Delete one user
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiPermission authenticated accountOwner
 * @apiDescription Delete a user
 * <br/><b>Throw error:</b> 404.
 *
 * @apiParam {Number} id User's ID
 * @apiExample Use example
 * delete http://localhost/users/15
 *
 * @apiSuccessStructure DeleteSuccess
 */
// ------------------------------------------------------------------------------------------
// Send reset token password of one user
//
//  - UserController.patch()
// ------------------------------------------------------------------------------------------
/**
 * @api {patch} /users/:id Generate user's password reset token
 * @apiName GenerateUserResetTokenPassword
 * @apiGroup Users
 * @apiPermission authenticated accountOwner
 * @apiDescription
 * <br/><b>Throw error:</b>
 *
 * @apiParamTitle (formData) Parameters (Form Data)
 * @apiParam (formData) {Boolean} reset_password true / false
 * @apiExample Example d'utilisation
 * patch http://localhost/users/15
 * form-data: reset_password=true
 *
 */