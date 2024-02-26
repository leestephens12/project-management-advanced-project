const nodemailer = require('nodemailer');

/**
 * This class is used to send emails to desired users
 */
class Mailer {

    static sendEmail(recipient, subject, message, HTMLMessage) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'donotreply.mangement.system@gmail.com', // email set up for our project
                pass: 'sqbq wwyh nuyv nfem' // one time app password through gmail
            }
        });

        let mailOptions = {
            from: 'donotreply.mangement.system@gmail.com',
            to: recipient, // List of recipients
            subject: subject, // Subject line
            text: message, // Plain text body
            html: HTMLMessage // HTML body
        };

        //Sends the email 
        transporter.sendMail(mailOptions);
    }

} module.exports = Mailer;