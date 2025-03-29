const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Ou tout autre service que tu utilises (Mailgun, SendGrid, etc.)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to " + to);
  } catch (error) {
    console.error("Error sending email: " + error.message);
  }
};

module.exports = { sendEmail }; 