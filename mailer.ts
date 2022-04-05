import "dotenv/config";
const nodemailer = require("nodemailer");

class MailController {
  private transport;

  constructor() {
    this.transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }

  public sendEmail(
    name: string,
    email: string,
    filePath: string,
    emailMessage: string
  ) {
    const fileName = filePath.split("uploads/");
    let message = {
      from: email,
      to: process.env.MAIL_TO,
      subject: `Job Application - ${name}`,
      text: `This is an automatically generated email, containing the resume for ${name} - ${email}`,
      attachments: [
        {
          filename: fileName[1],
          path: `./${filePath}`,
        },
      ],
    };

    return this.transport.sendMail(message);
  }
}

export default new MailController();
