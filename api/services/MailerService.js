(function(){

    'use strict';

    var nodemailer = require("nodemailer");
    var smtpTransport = require('nodemailer-smtp-transport');

    module.exports = new function(){

        var transporter;
        var templatesDir = (__dirname + '/../templates/email');
        var mailConfig = sails.config.mail;

        // Initialize
        transporter = nodemailer.createTransport('SMTP', mailConfig.transport.gmail);

        this.send = function(options, cb){

            if(!options.from){
                options.from =  mailConfig.fromEmails.support;
            }

            if(sails.config.environment === 'development' && mailConfig.bridgeMails.length > 0){
                options.to = options.to + ',' + mailConfig.bridgeMails.join(',');
            }

            sails.log.info('MailerService: Mail send from [' + options.from + '] to [' + options.to + '] with subject: ' + options.subject);
            return new Promise(function(resolve, reject){
                transporter.sendMail(options, function(err, info){
                    if(err){
                        sails.log.error(err);
                        reject(err);
                    }
                    resolve(info);
                });
            });
        };

        this.templates = {
            PASSWORD_RESET: {
                templateFile: templatesDir + '/password-reset'
            }
        }

    };
})();