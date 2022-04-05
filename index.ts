import express from "express";
import MailController from "./mailer";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

const app = express();
const port = 3000;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("its working");
});

app.post("/job", upload.single("cv"), (req, res) => {
  const { name, email, emailMessage } = req.body;
  MailController.sendEmail(
    name,
    email,
    req.file?.path || "",
    emailMessage
  ).then(
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
