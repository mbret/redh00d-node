/**
 * HelperController
 */

module.exports = {

    /**
     * Auth action. Used to make the first auth call from app
     *
     *
     */
    auth: function(req, res){
        // If we arrive here, it means that account is allowed and is legal
        return res.ok();
    }


};




