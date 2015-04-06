/**
 * HelperController
 */

module.exports = {

    me: function(req, res){
        console.log(req.user);
        return res.ok(req.user.toCustomer());
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




