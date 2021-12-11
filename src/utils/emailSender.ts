import { EMAIL } from '../utils/secrets';

const nodemailer = require('nodemailer');

export function sendEmail(to: string, subject: string, body: string) {

    var transporter = nodemailer.createTransport({
        service: EMAIL.EMAIL_SERVICE,
        host: EMAIL.EMAIL_HOST,
        auth: {
          user: EMAIL.EMAIL_USER,
          pass: EMAIL.EMAIL_PASSWORD
        }
      });

      var mailOptions = {
        from: EMAIL.EMAIL_USER,
        to: to,
        subject: subject,
        text: body
      };

      transporter.sendMail(mailOptions, function(error: any, info: any){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });  
}