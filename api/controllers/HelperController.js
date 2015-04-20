/**
 * HelperController
 */

module.exports = {

    me: function(req, res){
        return res.ok(req.user.toJSON());
    },

    /**
     * This action can be used to make sure API is reachable.
     * @param req
     * @param res
     * @returns {*}
     */
    ping: function(req, res){
        return res.ok();
    },

    authJWT: function(req, res){
        return res.ok();
    },

    authBasic: function(req, res){
        return res.ok();
    },

    /**
     * Simple route to test permissions
     * @param req
     * @param res
     */
    authorizedGet: function(req, res){
        return res.ok();
    },

    /**
     * Simple route to test permissions
     * @param req
     * @param res
     */
    authorizedPost: function(req, res){
        return res.ok();
    }


    /**
     * Helper that simulate login method.
     * @param req
     * @param res
     */
    //login: function(req, res){
    //    User.findOne({email: req.param('email', null)})
    //        .then(function(user){
    //            if(!user){
    //                return res.badRequest();
    //            }
    //            else{
    //                user.validatePassword(req.param('password', null), function(err, valid){
    //                    if(err) throw err;
    //                    if(valid){
    //                        return res.ok();
    //                    }
    //                    else{
    //                        return res.badRequest();
    //                    }
    //                });
    //            }
    //        })
    //        .catch(function(err){
    //            return res.serverError(err);
    //        });
    //}
};




