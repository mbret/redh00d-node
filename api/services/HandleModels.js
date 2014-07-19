/**
 * Created by Maxime on 7/18/2014.
 */
exports = {

    /**
     * Extract all possible data from the request (loop over params)
     * and return a literal object which match the model.
     * Exemple : two params name/place will return this object { name: 'the name', place: 'the place' }
     *
     * @param req
     * @return {*}
     * @private
     */
    extractEventDataFromRequest: function( req ){
        var dataToReturn = {};
        for( param in req.params ){
            switch(param){
                case 'name':
                    dataToReturn.name = param;
                    break;
                case 'place':
                    dataToReturn.place = place;
                    break;
                case 'description':
                    dataToReturn.description = description;
                    break;
                case 'date':
                    dataToReturn.date = date;
                    break;
            }
        }
        return dataToReturn;
    }

};