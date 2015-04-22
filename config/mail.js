

module.exports.mail = {

    transport: null,

    smtp: {
        ssl: false,
//            port: 25, // 465
        host: 'smtp.free.fr',
        to: 'xmax54@gmail.com',
        prepend_subject: 'Happy Contact Form | ',
        user: 'bret.maxime@gmail.com',
        pass: '08031990google'
    },
    // Default sender name and address for transactional emails
    from: {
        noReply: {
            name: 'Redh00d no reply',
            email: 'bret.maxime@gmail.com'
        },
        contact: {
            name: 'Redh00d contact',
            email: 'bret.maxime@gmail.com'
        }
    }

};
