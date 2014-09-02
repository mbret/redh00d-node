
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

// create reusable transporter object using SMTP transport
//var transporter = nodemailer.createTransport(smtpTransport({
//    host: sails.config.general.mail.smtp.host,
//    secureConnection: sails.config.general.mail.smtp.ssl,
//    port: sails.config.general.mail.smtp.port,
//    secure: sails.config.general.mail.smtp.ssl,
//    name: 'redh00d'
//    service: 'gmail',
//    auth: {
//        user: sails.config.general.mail.smtp.user,
//        pass: sails.config.general.mail.smtp.pass
//    }
//}));

var transporter = nodemailer.createTransport(); // development

module.exports = transporter;