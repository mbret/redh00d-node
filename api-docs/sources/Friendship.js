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
 * @todo write more here
 */

// ------------------------------------------------------------------------------------------
// Fetch one friendship request
//
//  Task:   UserFriendShipController.find()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users/:user_id/friendships-request/:id Find a friendship request
 * @apiName FindFriendship
 * @apiGroup Friendships
 * @apiGroupDescription API relatives to friendships. Friendship are a relation between two user. These users are considered as friends. A friendship is not necessary valid.
 * The friendship must be accepted by the target before being established, so the friendship can have several states like (waiting / cancelled / accepted / ...).
 * @apiDescription Allow to find a friendship by its ID
 * <br/><b>Throw error:</b> 404
 *
 * @apiPermission authenticated author
 *
 * @apiParam {Number} user_id User's ID
 * @apiParam {Number} id Friendship's ID
 * @apiExample Use example
 * get http://localhost/users/15/friendships-request/25
 *
 * @apiSuccessStructure FindSuccess
 */
// ------------------------------------------------------------------------------------------
// Fetch all
//
//  Task:   UserFriendShipController.findMultiple()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users/:id/friendships-request Find friendships requests
 * @apiName FindFriendships
 * @apiGroup Friendships
 * @apiPermission authenticated author
 * @apiDescription Fetch friendships
 * <br/><b>Throw error:</b>
 *
 * @apiStructure fetchFriendshipsParams
 * @apiExample Use example
 * get /users/:id/friendships-request
 * get /users/:id/friendships-request?sort=asc&state=accepted
 *
 * @apiSuccessStructure FindMultipleSuccess
 */
// ------------------------------------------------------------------------------------------
// Create one friendship request
//
//  Task:   UserFriendShipController.create()
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /users/:id/friendships-request Create a friendship request
 * @apiName CreateFriendship
 * @apiGroup Friendships
 * @apiPermission authenticated
 * @apiDescription Create one user friendships.
 * <br/><b>Throw error:</b> 400.
 *
 * @apiParam (dataParam) {Number} target_id
 * @apiExample Use example
 * post http://localhost/users/15/friendships-request
 * form-data: target_id=36
 *
 * @apiSuccessStructure CreateSuccess
 */
// ------------------------------------------------------------------------------------------
// Cancel one friendship request
//
//  Description: The applicant can cancel his request and the target can cancel the
//               received request
// ------------------------------------------------------------------------------------------
/**
 * @api {delete} /users/:id/friendships-request/:id Cancel a friendship request
 * @apiName DeleteFriendshipRequest
 * @apiGroup Friendships
 * @todo
 */
// ------------------------------------------------------------------------------------------
// Cancel one friendship
//
//  Description: Both applicant/target can cancel the friendship
// ------------------------------------------------------------------------------------------
/**
 * @api {delete} /users/:id_applicant/friendships/:id_target Cancel a friendship
 * @apiName DeleteFriendship
 * @apiGroup Friendships
 * @todo
 */
// ------------------------------------------------------------------------------------------
// Update one friendship request
// ------------------------------------------------------------------------------------------
/**
 * @-api {put} users/:id/friendships/:id Update friendship
 * @-apiName UpdateFriendship
 * @-apiGroup Friendships
 * @todo
 */
// ------------------------------------------------------------------------------------------
// Fetch one friend
// ------------------------------------------------------------------------------------------
/**
 * @api {get} users/:id/friends/:id Find one user's friend
 * @apiName FindUserFriend
 * @apiGroup Friendships
 * @todo
 */
// ------------------------------------------------------------------------------------------
// Fetch friends
// ------------------------------------------------------------------------------------------
/**
 * @api {get} users/:id/friends Find user's friends
 * @apiName FindUserFriends
 * @apiGroup Friendships
 * @todo
 */
