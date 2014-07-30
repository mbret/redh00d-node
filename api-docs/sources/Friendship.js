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
// Fetch one friendship
//
//  Task:   UserFriendShipController.find()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users/:user_id/friendships/:id Find a friendship request
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
 * @apiDescription Fetch friendships
 * <br/><b>Throw error:</b>
 *
 * @apiStructure fetchFriendshipsParams
 * @apiExample Use example
 * get http://localhost/users/:id
 * get http://localhost/users/:id?sort=asc&state=accepted
 *
 * @apiSuccessStructure FindMultipleSuccess
 */
// ------------------------------------------------------------------------------------------
// Create one friendship
//
//  Task:   UserFriendShipController.create()
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /users/:id/friendships Create a friendship request
 * @apiName CreateFriendship
 * @apiGroup Friendships
 * @apiPermission authenticated
 * @apiDescription Create one user friendships.
 * <br/><b>Throw error:</b> 400.
 *
 * @apiParam (dataParam) {Number} target_id
 * @apiExample Use example
 * post http://localhost/users/15/friendships
 * form-data: target_id=36
 *
 * @apiSuccessStructure CreateSuccess
 */
// ------------------------------------------------------------------------------------------
// Cancel one friendship
//
// ------------------------------------------------------------------------------------------
/**
 * @api {delete} /users/:id/friendships/:id Cancel a friendship request
 * @apiName DeleteFriendship
 * @apiGroup Friendships
 */
// ------------------------------------------------------------------------------------------
// Update one friendship
// ------------------------------------------------------------------------------------------
/**
 * @api {put} users/:id/friendships/:id Update friendship
 * @apiName UpdateFriendship
 * @apiGroup Friendships
 */
// ------------------------------------------------------------------------------------------
// Fetch one friend
// ------------------------------------------------------------------------------------------
/**
 * @api {get} users/:id/friends/:id Find one user's friend
 * @apiName wxcCreateFriendship
 * @apiGroup Friendships
 */
// ------------------------------------------------------------------------------------------
// Fetch friends
// ------------------------------------------------------------------------------------------
/**
 * @api {get} users/:id/friends Find user's friends
 * @apiName wxcwxcCreateFriendship
 * @apiGroup Friendships
 */
