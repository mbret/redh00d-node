/**
 * Created by Maxime on 7/18/2014.
 */
exports.transformValidation = function(model, validationError) {
    var validation_response = {};
    var messages = model.validation_messages;
    var validation_fields = Object.keys(messages);

    // foreach attributes
    validation_fields.forEach(function(validation_field) {

        // If an error exist for this attribute
        if (validationError[validation_field]) {
            var processField = validationError[validation_field];

            // For each error about this attribute
            processField.forEach(function(rule) {

                // When the error message match with message inside model then replace it
                if (messages[validation_field][rule.rule]) {
                    if (!(validation_response[validation_field] instanceof Array)) {
                        validation_response[validation_field] = new Array();
                    }
                    var newMessage = {};
                    newMessage[rule.rule] = messages[validation_field][rule.rule];
                    validation_response[validation_field].push(newMessage);
                }
            });

        }
    });

    return validation_response;
};