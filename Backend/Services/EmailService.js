import transporter from "../Config/EmailConfig.js";

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

export default sendEmail;
