// ------------------------------------------------------------------------------------------
// Documentation relative to users groups
//
//  - The group can only live behind a user. That's why a user ID is always required.
//
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// Find a friendship group
//
//  - UserFriendGroupController.find()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users/:id_user/friendsgroups/:id_group Find a group
 * @apiName FindUserGroup
 * @apiGroup Friends Groups
 * @apiGroupDescription Friends groups are simple group of users that one user can make. They are personal and private to each user.
 * @apiDescription
 * <br/><b style="color:green;">Throw valid response:</b> 200.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403, 404.
 *
 * @apiPermission authenticated
 *
 * @apiParam {Number} id_user Friends group's ID.
 * @apiParam {Number} id_group Friends group's ID.
 * @apiExample Use example
 * GET http://109.31.47.142:3000/api/users/15/friendsgroups/10
 *
 * @apiSuccessStructure FindSuccess
 */
// ------------------------------------------------------------------------------------------
// Find user's groups
//
//  - UserFriendGroupController.findMultiple()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /users/:id_user/friendsgroups Find groups
 * @apiName FindUserGroups
 * @apiGroup Friends Groups
 * @apiDescription
 * <br/><b style="color:green;">Throw valid response:</b> 200.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403, 404.
 *
 * @apiPermission authenticated
 *
 * @apiParam {Number} id_user Friends group's ID.
 * @apiExample Use example
 * GET http://109.31.47.142:3000/api/users/15/friendsgroups
 *
 * @apiSuccessStructure FindMultipleSuccess
 */
// ------------------------------------------------------------------------------------------
// Create a user group
//
//  - UserFriendGroupController.create()
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /users/:id_id/friendsgroups Create a group
 * @apiName CreateUserGroup
 * @apiGroup Friends Groups
 * @apiDescription
 * <br/><b style="color:green;">Throw valid response:</b> 201.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403, 409.
 *
 * @apiPermission authenticated
 *
 * @apiParam {Number} id_user Friends group's ID.
 * @apiParam (dataParam) {String} name Name of the group.
 * @apiExample Use example
 * POST http://109.31.47.142:3000/api/users/15/friendsgroups
 * form-data:
 * ----------
 * name: Family
 *
 * @apiSuccessStructure CreateSuccess
 */
// ------------------------------------------------------------------------------------------
// Update a user group
//
//  - UserFriendGroupController.update()
// ------------------------------------------------------------------------------------------
/**
 * @api {put} /users/:id_user/friendsgroups/:id_group Update a group
 * @apiName UpdateUserGroup
 * @apiGroup Friends Groups
 * @apiDescription
 * <br/><b style="color:green;">Throw valid response:</b> 200.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403.
 *
 * @apiParam {Number} id_user Friends group's ID.
 * @apiParam {Number} id_group Friends group's ID.
 * @apiParam (dataParam) {String} name New name of the group
 * @apiExample Use example
 * PUT http://109.31.47.142:3000/api/users/15/friendsgroups
 * form-data:
 * ----------
 * name: Family
 *
 * @apiSuccessStructure UpdateSuccess
 */
// ------------------------------------------------------------------------------------------
// Delete a user group
//
//  - UserFriendGroupController.delete()
// ------------------------------------------------------------------------------------------
/**
 * @api {delete} /users/:id_user/friendsgroups/:id_group Delete a group
 * @apiName DeleteUserGroup
 * @apiGroup Friends Groups
 * @apiDescription
 * <br/><b style="color:green;">Throw valid response:</b> 204.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403.
 *
 * @apiParam {Number} id_user Friends group's ID.
 * @apiParam {Number} id_group Friends group's ID.
 * @apiExample Use example
 * DELETE http://109.31.47.142:3000/api/users/15/friendsgroups/10
 *
 * @apiSuccessStructure DeleteSuccess
 */
// ------------------------------------------------------------------------------------------
// Add a member inside group
//
//  - UserFriendGroupController.addMember()
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /users/:id_user/friendsgroups/:id_group/members Add a group member
 * @apiName AddUserGroupMember
 * @apiGroup Friends Groups
 * @apiDescription
 * <br/><b style="color:green;">Throw valid response:</b> 201.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403, 409.
 *
 * @apiParam (urlParam) {Number} id_user Friends group's ID.
 * @apiParam (urlParam) {Number} id_group Friends group's ID.
 * @apiParam (urlParam) {Number} id_member The user ID you want to add.
 * @apiParam (dataParam) {String} name New name of the group
 * @apiExample Use example
 * POST http://109.31.47.142:3000/api/users/15/friendsgroups/10/members
 * form-data:
 * ----------
 * id_member: 25
 *
 * @apiSuccessStructure CreateSuccess
 */
// ------------------------------------------------------------------------------------------
// Delete a member inside group
//
//  - UserFriendGroupController.deleteMember()
// ------------------------------------------------------------------------------------------
/**
 * @api {delete} /users/:id_user/friendsgroups/:id_group/members/:id_member Delete a group member
 * @apiName DeleteUserGroupMember
 * @apiGroup Friends Groups
 * @apiDescription
 * <br/><b style="color:green;">Throw valid response:</b> 204.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403.
 *
 * @apiParam (urlParam) {Number} id_user Friends group's ID.
 * @apiParam (urlParam) {Number} id_group Friends group's ID.
 * @apiParam (urlParam) {Number} id_member Member's ID.
 * @apiExample Use example
 * DELETE http://109.31.47.142:3000/api/users/15/friendsgroups/10/members/25
 *
 * @apiSuccessStructure DeleteSuccess
 */
