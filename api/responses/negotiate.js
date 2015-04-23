/**
 * Generic Error Handler / Classifier
 *
 * Calls the appropriate custom response for a given error,
 * out of the bundled response modules:
 * badRequest, forbidden, notFound, & serverError
 *
 * Defaults to `res.serverError`
 *
 * Usage:
 * ```javascript
 * if (err) return res.negotiate(err, code, message);
 * ```
 *
 * @param {*} error(s)
 *
 */

module.exports = function (err, code, message) {

    // Get access to response object (`res`)
    var res = this.res;

    var statusCode = 500;
    var body = err;

    try {

        statusCode = err.status || 500;

        // Set the status
        // (should be taken care of by res.* methods, but this sets a default just in case)
        res.status(statusCode);

    } catch (e) {}

    // Respond using the appropriate custom response
    if (statusCode === 403) return res.forbidden(body, code, message);
    if (statusCode === 404) return res.notFound(body, code, message);
    if (statusCode >= 400 && statusCode < 500) return res.badRequest(body, code, message);
    return res.serverError(body, code, message);
};