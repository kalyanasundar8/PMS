import nodemailer from "nodemailer";
import 'dotenv/config';

console.log(process.env.USER_EMAIL, process.env.USER_EMAIL_PASS)
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_EMAIL_PASS,
  },
});

export default transporter;
