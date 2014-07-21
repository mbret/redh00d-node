/**
 * Created by Maxime on 7/18/2014.
 *
 * This service cotain some useful function for API management
 */
exports.helper = {

    foo: function(){
        // `sails` object is available here:
    },


    /**
     * Return the base of a well structured data in order to give a correct API response.
     * @param data {object}
     * @param response {object}
     * @returns {object}
     */
    getBaseResponseData: function( data, req, res ){
        if( ! data ) {
            data = {};
        }
        if( sails.config.environment === 'development' ){
            data._debug = {
                api_version: sails.config.general.apiVersion,
                locale: res.locale,
                region: res.region,
                session: req.session,
                sessionID: req.sessionID,
                sessionStore: req.sessionStore,
                signedCookies: req.signedCookies
            }
        }
        return data;
    }

};

// `sails` is not available out here
// (it doesn't exist yet)