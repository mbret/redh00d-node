// ------------------------------------------------------------------------------------------
// Shortcut for fetch users params
// Include this structure if you need params used as filter
// ------------------------------------------------------------------------------------------
/**
 * @apiDefineStructure fetchFriendshipsParams
 * @apiParam (urlParam) {Number} [id] Use it to retrieve only one friendship with its ID.
 * @apiParam (urlParam) {String} [state]
 * @apiParam (urlParam) {String} [createdDate]
 * @apiParam (urlParam) {String} [sort] Sort results in differant way.
 *
 */

// ------------------------------------------------------------------------------------------
// Fetch one friendship request
//
//  Task:   UserFriendShipController.find()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users/:user_id/friendships/:id Find a friendship request
 * @apiName FindFriendship
 * @apiGroup Friendships
 * @apiGroupDescription API relatives to friendships. Friendship are a relation between two user. These users are considered as friends. A friendship is not necessary valid.
 * <br/>The friendship must be accepted by the target before being established, so the friendship can have several states like (waiting / cancelled / accepted / ...).
 * @apiDescription Allow to find a friendship by its ID
 * <br/><b style="color:green;">Throw valid response:</b> 200.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403, 404.
 *
 * @apiPermission authenticated author
 *
 * @apiParam {Number} user_id User's ID
 * @apiParam {Number} id Friendship's ID
 * @apiExample Use example
 * get http://localhost/users/15/friendships/25
 *
 * @apiSuccessStructure FindSuccess
 */
// ------------------------------------------------------------------------------------------
// Fetch all
//
//  Task:   UserFriendShipController.findMultiple()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users/:id/friendships Find friendships requests
 * @apiName FindFriendships
 * @apiGroup Friendships
 * @apiPermission authenticated author
 * @apiDescription Fetch all friendships request with any states.
 * <br/><b style="color:green;">Throw valid response:</b> 200.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403.
 *
 * @apiParam (urlParam) {Number} [id] Search by ID.
 * @apiStructure fetchFriendshipsParams
 * @apiExample Use example
 * GET http://localhost/users/10/friendships
 * GET http://localhost/users/10/friendships?state=accepted
 *
 * @apiSuccessStructure FindMultipleSuccess
 */

 // ------------------------------------------------------------------------------------------
 // Respond one friendship request
 //
 //  Task:   UserFriendShipController.update()
 // ------------------------------------------------------------------------------------------
 /**
  * @api {put} users/:id_user/friendships/:id_friendship Respond a friend request
  * @apiName UpdateFriendship
  * @apiGroup Friendships
  * @apiPermission authenticated accountOwner admin
  * @apiDescription
  * <br/><b style="color:green;">Throw valid response:</b> 200.
  * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403.
  *
  * @apiParam (urlParams) {Number} id_user User's ID.
  * @apiParam (urlParams) {Number} id_friendship ID of the concerned friendship.
  * @apiParam (dataParam) {String} accept (true/false)
  * @apiExample Use example
  * PUT http://localhost/users/10/friendships/26
  * form-data:
  * ----------
  * accept: false (I don't give a shit about you dude!) or true (Come to share a bit of Mojo time bro <3)
  *
  * @apiSuccessStructure UpdateSuccess
  */
// ------------------------------------------------------------------------------------------
// Create friend request
//
//  Task:   UserFriendShipController.create()
// ------------------------------------------------------------------------------------------
/**
  * @api {post} /users/:id_user/friendships Ask a new friend
  * @apiName CreateFriendship
  * @apiGroup Friendships
  * @apiPermission authenticated
  * @apiDescription This will create a new friend request for the specified user. The friendship will only have the state "wait for response".
  * <br/><b style="color:green;">Throw valid response:</b> 201.
  * <br/><b style="color:red;">Throw error response:</b> 400, 409.
  *
  * @apiParam (urlParams) {Number} id_user User's ID.
  * @apiParam (dataParams) {Number} id_friend ID of the user to ask as friend.
  * @apiParam (dataParams) {boolean} force_accept <b>Admin.</b> Force the acceptance. (true/false).
  * @apiExample Use example
  * POST http://localhost/users/10/friends
  * form-data:
  * ----------
  * id_friend: 27
  *
  * @apiSuccessStructure CreateSuccess
 */
// ------------------------------------------------------------------------------------------
// Cancel one friendship
//   - UserFriendshipController.delete()
// ------------------------------------------------------------------------------------------
/**
 * @api {delete} /users/:id_user/friendships/:id_friendship Delete a friendship
 * @apiName DeleteFriendship
 * @apiGroup Friendships
 * @apiPermission accountOwner admin
 * @apiDescription
 * <br/><b style="color:green;">Throw valid response:</b> 204.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403.
 *
 * @apiParam (urlParams) {Number} id_user User's ID.
 * @apiParam (urlParams) {Number} id_friendship ID of the friendship to cancel.
 * @apiExample Use example
 * DELETE http://localhost/users/15/friends/27
 *
 * @apiSuccessStructure DeleteSuccess
 */

// ------------------------------------------------------------------------------------------
//
//                    Work with Friend (as user) resources
//
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// Fetch friends
//   - UserFriendshipController.findFriends()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users/:id/friends Find friends
 * @apiName FindUserFriends
 * @apiGroup Friendships
 * @apiDescription Find a user's friends.
 * <br/><b style="color:green;">Throw valid response:</b> 200.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403.
 *
 * @apiExample Use example
 * GET http://localhost/users/15/friends
 *
 * @apiSuccessStructure FindMultipleSuccess
 */
