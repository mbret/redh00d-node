/**
 * Node Mailer service and setup
 *
 * @tips: sails object is availabe inside service
 * @ref: use nodemailer https://github.com/andris9/Nodemailer
 */

var nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport( "SMTP", {
    host: sails.config.general.mail.host,
    secureConnection: sails.config.general.mail.ssl,
    port: sails.config.general.mail.port,
    auth: {
        user: sails.config.general.mail.user,
        pass: sails.config.general.mail.pass
    }
});