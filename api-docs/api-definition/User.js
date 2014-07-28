// ------------------------------------------------------------------------------------------
// Shortcut for fetch users params
// Include this structure if you need params used as filter
// ------------------------------------------------------------------------------------------
/**
 * @apiDefineStructure fetchUsersParams
 * @apiParam (urlParam) {Number} [id] Use it to retrieve only one user with its ID.
 * @apiParam (urlParam) {String} [firstname]
 * @apiParam (urlParam) {String} [lastname]
 * @apiParam (urlParam) {String} [sort] Sort results in differant way.
 * @todo write more here
 */


// ------------------------------------------------------------------------------------------
// Fetch one
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
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /users Create one user
 * @apiName CreateUser
 * @apiGroup Users
 * @apiPermission authenticated
 * @apiDescription Create one user and retrieve the created object.
 * <br/><b>Throw error:</b> 400.
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
 * @apiErrorStructure BadRequestErrorEmailTaken
 *
 */
// ------------------------------------------------------------------------------------------
// Update one
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
 * @apiExample Use example
 * put http://localhost/users
 * form-data: email=xmax54%40gmail.com&firstname=pascal
 *
 * @apiSuccessStructure UpdateSuccess
 *
 */
// ------------------------------------------------------------------------------------------
// Delete one
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
// Fetch events from one user
// ------------------------------------------------------------------------------------------

/**
 * @api {get} /users/:id/events Find user's events
 * @apiName FindUserEvents
 * @apiGroup Users
 * @apiPermission authenticated
 * @apiDescription Find user's events
 * <br/><b>Throw error:</b>
 *
 * @apiParam (urlParam) {Number} id User's ID
 * @apiStructure fetchEventsParams
 * @apiExample Use example
 * get http://localhost/users/15/events
 * get http://localhost/users/15/events?sort=asc&eventDate=204-12-24
 *
 * @apiSuccessStructure FindMultipleSuccess
 */
// ------------------------------------------------------------------------------------------
// Delete events from one user
// ------------------------------------------------------------------------------------------
/**
 * @api {delete} /users/:id/events Delete user's events
 * @apiName DeleteUserEvents
 * @apiGroup Users
 * @apiPermission authenticated author
 * @apiDescription Delete user's events
 * <br/><b>Throw error:</b>
 *
 * @apiExample Use example
 * delete http://localhost/users/15/events
 *
 * @apiSuccessStructure DeleteSuccess
 */
// ------------------------------------------------------------------------------------------
// Send reset token password of one user
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