/**
 * Created by bretm on 8/10/2015.
 */
var path        = require('path');
var mysql       = require('mysql');
var connection  = mysql.createConnection({
    host     : 'localhost',
    user     : 'redh00d',
    password : 'redh00d',
    database : 'redh00d'
});

connection.connect();

// Insert role
connection.query("TRUNCATE `user_role`", function(err, rows, fields) {
    if(err) throw err;
});
connection.query("INSERT INTO `user_role` (`userRoleID`, `userRoleName`, `userRoleDisplayName`) VALUES (1, 'admin', 'Administrator')", function(err, rows, fields) {
    if(err) throw err;
});
connection.query("INSERT INTO `user_role` (`userRoleID`, `userRoleName`, `userRoleDisplayName`) VALUES (2, 'user', 'User')", function(err, rows, fields) {
    if(err) throw err;
});

// Insert user
connection.query("TRUNCATE `user`", function(err, rows, fields) {
    if(err) throw err;
});
connection.query("INSERT INTO `user` (`createdAt`, `updatedAt`, `userID`, `userMail`, `userFirstName`, `userLastName`, `FK_userRoleID`, `userPhone`, `userPasswordResetToken`) VALUES ('2015-08-10 22:50:30', '2015-08-10 22:50:38', 2, 'user@user.com', 'User', 'User', 2, NULL, NULL);", function(err, rows, fields) {
    if(err) throw err;
});

// Insert passport
connection.query("TRUNCATE `user_passport`", function(err, rows, fields) {
    if(err) throw err;
});
connection.query("INSERT INTO `user_passport` (`protocol`, `password`, `provider`, `identifier`, `accessToken`, `resetPasswordToken`, `resetPasswordTokenExpires`, `user`, `id`, `createdAt`, `updatedAt`) VALUES ('local', '$2a$10$YToL4y/wm.qltR5dZ.hwOO356SOEE4LLFE.Fjqt9i914wHijNgHpK', NULL, NULL, NULL, NULL, NULL, 2, 1, '2015-08-10 22:50:30', '2015-08-10 22:50:30');", function(err, rows, fields) {
    if(err) throw err;
});

connection.end();
