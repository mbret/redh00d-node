// ------------------------------------------------------------------------------------------
// Fetch one
//
//  - ProductController.find()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /products/:id Find one product
 * @apiName FindProduct
 * @apiGroup Products
 * @apiGroupDescription API relatives to products.
 * @apiDescription
 * <br/><b style="color:green;">Throw valid response:</b> 200.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403, 404.
 *
 * @apiPermission user admin
 *
 * @apiParam {Number} id Product's ID
 * @apiExample Use example
 * GET http://109.31.47.142:3000/api/products/15
 *
 * @apiSuccessStructure FindSuccess
 */
// ------------------------------------------------------------------------------------------
// Fetch all
//
//  - ProductController.findMultiple()
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /products Find products
 * @apiName FindMultipleProduct
 * @apiGroup Products
 * @apiPermission user admin
 * @apiDescription
 * <br/><b style="color:green;">Throw valid response:</b> 200.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403.
 *
 * @apiExample Use example
 * GET http://109.31.47.142:3000/api/products
 *
 * @apiSuccessStructure FindMultipleSuccess
 */
// ------------------------------------------------------------------------------------------
// Create one
//
//  - ProductController.create()
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /products Create one product
 * @apiName CreateProduct
 * @apiGroup Products
 * @apiPermission user admin
 * @apiDescription
 * <br/><b style="color:green;">Throw valid response:</b> 201.
 * <br/><b style="color:red;">Throw error response:</b> 400, 409.
 *
 * @apiParam (dataParam) {Boolean} official <b>Admin.</b>
 * @apiParam (dataParam) {String} name
 * @apiParam (dataParam) {String} [logo]
 * @apiParam (dataParam) {Number} category_id
 * @apiExample Use example
 * POST http://109.31.47.142:3000/api/products
 * form-data:
 * ----------
 * official: true
 * name: Chips
 * logo:
 * category_id: 1
 *
 * @apiSuccessStructure CreateSuccess
 */
// ------------------------------------------------------------------------------------------
// Update one
//
//  Task:           ProductController.update()
// ------------------------------------------------------------------------------------------
/**
 * @api {put} /products Update one product
 * @apiName UpdateProduct
 * @apiGroup Products
 * @apiPermission todo
 * @apiDescription
 * <br/><b style="color:green;">Throw valid response:</b> 200.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403.
 *
 * @apiParam (dataParam) {String} [name]
 * @apiParam (dataParam) {Number} [category_id]
 * @apiParam (dataParam) {String} [logo]
 * @apiParam (dataParam) {String} [official] <b>Admin.</b>
 * @apiExample Use example
 * PUT http://109.31.47.142:3000/api/products
 * form-data:
 * ----------
 * official: true
 * name: Chips
 * logo:
 * category_id: 1
 *
 * @apiSuccessStructure UpdateSuccess
 */
// ------------------------------------------------------------------------------------------
// Delete one
//
//  - ProductController.delete()
// ------------------------------------------------------------------------------------------
/**
 * @api {delete} /products/:id Delete one product
 * @apiName DeleteProduct
 * @apiGroup Products
 * @apiPermission todo
 * @apiDescription
 * <br/><b style="color:green;">Throw valid response:</b> 204.
 * <br/><b style="color:red;">Throw error response:</b> 400, 401, 403.
 *
 * @apiParam (urlParams) {Number} id Product's ID.
 * @apiExample Use example
 * DELETE http://109.31.47.142:3000/api/products/15
 *
 * @apiSuccessStructure DeleteSuccess
 */
