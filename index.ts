import express from "express";
import MailController from "./mailer";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log("its working");
});

app.post("/job", jsonParser, (req, res) => {
  const { name, email, cv, emailMessage } = req.body;
  MailController.sendEmail(name, email, cv, emailMessage).then(
    () =>
      res.status(200).send({
        message: "Email sent",
      }),
    () =>
      res.status(500).send({
        message: "Something wrong happened",
      })
  );
});
