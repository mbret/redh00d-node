/**
 * Created by Maxime on 7/18/2014.
 */

var convert = {
    lastName: "lastname",
    rule: "code",
    userMail: "email"
}

module.exports = {

    /**
     * Transform validation error response from waterline to a way our web service is using.
     *
     * transform:
     *  userMail -> mail
     *  firstName -> firstname
     *  rule -> code
     *  ...
     */
    transformFromWaterline: function( validationErrors ){

        var validation_fields = Object.keys(validationErrors);
        var correctValidationErrors = {};

        // foreach fields
        validation_fields.forEach(function(validation_field) {

            // transform field key
            if(validation_field in convert){
                newField = convert[validation_field];
            }
            else{
                newField = validation_field;
            }
            correctValidationErrors[newField] = (validationErrors[validation_field]);

            // loop over all error concerning this field
            for (var i = 0; i < correctValidationErrors[newField].length; i++) {
                var errorPropertyKeys = Object.keys(correctValidationErrors[newField][i]);

                // current property (rule/message/...)
                errorPropertyKeys.forEach(function(errorPropertyKey) {
                    if(errorPropertyKey in convert){
                        correctValidationErrors[newField][i][convert[errorPropertyKey]] = correctValidationErrors[newField][i][errorPropertyKey];
                        delete correctValidationErrors[newField][i][errorPropertyKey];
                    }
                });
            }
        });
        return correctValidationErrors;
    }

};