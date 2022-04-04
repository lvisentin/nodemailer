const nodemailer = require('nodemailer');

class MailController {
  private transport;

  constructor() { 
    this.transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ee9b5f87e0e764",
        pass: "b650680d356642"
      }
    });
    
  }

  public sendEmail(name: string, email: string, cv: string, emailMessage: string) {
    console.log(this.transport.host)
    const message = {
      from: email,
      to: 'lvise.batista@gmail.com',
      subject: `Job Application - ${name}`,
      text: emailMessage
    }
    
    return this.transport.sendMail(message);
  }  
}

export default new MailController();