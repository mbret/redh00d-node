/**
 * Created by Maxime on 18/11/2014.
 */

var fs = require('fs');
var uuid = require('node-uuid');

module.exports = {

    checkPermission: function(path, type, cb){
        if(type == 'write'){
            var file = path + '/check_permission_' + uuid.v1();
            async.series([
                function(callback){
                    fs.writeFile(file, "", function(err) { return callback(err); });
                },
                function(callback){
                    fs.unlink(file, function(err) { return callback(err); });
                }
            ], function(err){
                if(err) {
                    return cb(null, false);
                }
                return cb(null, true);
            })
        }
        else{
            throw new Error('No type specified for checkPermission');
        }
    }
};