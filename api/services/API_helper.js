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
    getBaseResponseData: function( data, response ){
        if( ! data ) {
            data = {};
        }
        data.locale = res.locale;
        data.api_version = sails.config.general.apiVersion;
        return data;
    }

};

// `sails` is not available out here
// (it doesn't exist yet)