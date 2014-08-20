// ------------------------------------------------------------------------------------------
// Fetch one
//
//  - UserController.find()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users/:id Find one user
 * @apiName FindUser
 * @apiGroup Users
 * @apiGroupDescription API relatives to users and in more explicitly way accounts.
 * @apiDescription Find a user by its ID. While request is not correct or no users exist you will get a 404 error.
 * <br/><b style="color:green;">Throw valid response:</b> 200.
 * <br/><b style="color:red;">Throw error response:</b> 401, 403, 404.
 *
 * @apiPermission user admin
 *
 * @apiParam (urlParam) {Number} id User's ID
 * @apiExample Use example
 * GET http://localhost/users/15
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
 * @apiPermission user admin
 * @apiDescription Fetch group of users with criterias. The response is never empty and in worst case you will get an empty object.
 * <br/><b style="color:green;">Throw valid response:</b> 200.
 * <br/><b style="color:red;">Throw error response:</b> 401, 403.
 *
 * @apiParam (urlParam) {Number} [id] Search by ID.
 * @apiParam (urlParam) {String} [seniority_sort] (asc/desc) Search by recent or old created accounts.
 * @apiParam (urlParam) {String} [email]
 * @apiParam (urlParam) {String} [firstname] Search by firstname.
 * @apiParam (urlParam) {String} [lastname] Search by lastname.
 * @apiParam (urlParam) {String} [firstname_sort] value: asc / desc.
 * @apiParam (urlParam) {String} [lastname_sort] value: asc / desc.
 * @apiParam (urlParam) {String} [firstname_like] Search by firstname with LIKE condition. Value example: "ax" will return "maxime" or "max".
 * @apiParam (urlParam) {String} [lastname_like] Search by lastname with LIKE condition. Value example: "re" will return "bret" or "breton".
 * @apiExample Use example
 * GET http://localhost/users
 * GET http://localhost/users?sort=asc&firstname=maxime
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
 * @apiPermission guest admin
 * @apiDescription Create one user and retrieve the created object. A user is designed by a unique email.
 * If the user exist or one of primary field is already taken then the response will be 409.
 * <br/><b style="color:green;">Throw valid response:</b> 201.
 * <br/><b style="color:red;">Throw error response:</b> 400, 403, 409.
 *
 * @apiParam (dataParam) {String} email Should be unique.
 * @apiParam (dataParam) {String} password This password is the md5 hashed + salted password.
 * @apiParam (dataParam) {String} firstname
 * @apiParam (dataParam) {String} lastname
 * @apiParam (dataParam) {String} [phone] Must be in this form: +33656565656 with (+??) as the country identifier.
 * @apiParam (dataParam) {String} [api_key] <b>Admin.</b> Force api key value.
 * @apiParam (dataParam) {String} [role_id] <b>Admin.</b> force role ID value.
 * @apiExample Use example
 * POST http://localhost/users
 * form-data:
 * ----------
 * email: xmax54@gmail.com
 * password: password
 * ...
 *
 * @apiSuccessStructure CreateSuccess
 *
 */
// ------------------------------------------------------------------------------------------
// Update one
//
//  Task:           UserController.update()
// ------------------------------------------------------------------------------------------
/**
 * @api {put} /users/:id Update one user
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiPermission user admin
 * @apiDescription Update an user and get it back. A generated reset token is needed to update password, see the designed method. <b>An user can only update its own account</b>.
 * <br/><b style="color:green;">Throw valid response:</b> 200.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403, 404.
 *
 * @apiParam (urlParam) {Number} id
 * @apiParam (dataParam) {String} [email] <b>Admin.</b>
 * @apiParam (dataParam) {String} [password] A token is required to update password. This password is the md5 hashed + salted password.
 * @apiParam (dataParam) {String} [password_token] Required token to update password.
 * @apiParam (dataParam) {String} [firstname]
 * @apiParam (dataParam) {String} [lastname]
 * @apiParam (dataParam) {String} [phone]
 * @apiParam (dataParam) {String} [preference_foo] Change the preference foo
 * @apiExample Use example
 * PUT http://localhost/users/1
 * form-data:
 * ----------
 * email: xmax54@gmail.com
 * password: password
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
 * @apiPermission accountOwner admin
 * @apiDescription To delete a user you must have correct rights.
 * <br/><b style="color:green;">Throw valid response:</b> 204.
 * <br/><b style="color:red;">Throw error response:</b> 401, 403, 404.
 *
 * @apiParam (urlParams) {Number} id User's ID.
 * @apiExample Use example
 * DELETE http://localhost/users/15
 *
 * @apiSuccessStructure DeleteSuccess
 */
// ------------------------------------------------------------------------------------------
// Send reset token password of one user
//
//  - UserController.patch()
// ------------------------------------------------------------------------------------------
/**
 * @api {patch} /users/:email Generate a user's pwd reset token
 * @apiName GenerateUserResetTokenPassword
 * @apiGroup Users
 * @apiPermission authenticated accountOwner admin
 * @apiDescription Generate a password reset token for the designed user. This token can be used later to update the user password. Then send an email to the specified user.
 * <br/><b style="color:green;">Throw valid response:</b> 204.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403.
 *
 * @apiParam (urlParams) {String} email User's email.
 * @apiParam (dataParam) {Boolean} reset_password true
 * @apiExample Use example
 * PATCH http://localhost/users/user@user.com
 * form-data:
 * ----------
 * reset_password=true
 *
 * @apiSuccessStructure PatchSuccess
 */
