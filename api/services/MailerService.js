
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

// create reusable transporter object using SMTP transport
//var transporter = nodemailer.createTransport(smtpTransport({
//    host: sails.config.all.mail.smtp.host,
//    secureConnection: sails.config.all.mail.smtp.ssl,
//    port: sails.config.all.mail.smtp.port,
//    secure: sails.config.all.mail.smtp.ssl,
//    name: 'redh00d'
//    service: 'gmail',
//    auth: {
//        user: sails.config.all.mail.smtp.user,
//        pass: sails.config.all.mail.smtp.pass
//    }
//}));

var transporter = nodemailer.createTransport(); // development

module.exports = transporter;