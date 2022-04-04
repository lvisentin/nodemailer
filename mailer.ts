import 'dotenv/config';
const nodemailer = require('nodemailer');

class MailController {
  private transport;

  constructor() { 
    this.transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    });
    
  }

  public sendEmail(name: string, email: string, cv: string, emailMessage: string) {
    const message = {
      from: email,
      to: process.env.MAILTRAP_TO,
      subject: `Job Application - ${name}`,
      text: emailMessage
    }
    
    return this.transport.sendMail(message);
  }  
}

export default new MailController();