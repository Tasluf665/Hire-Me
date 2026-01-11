const nodemailer = require("nodemailer");
const config = require("config");
const jwt = require("jsonwebtoken");

const sendEmail = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Must be false for port 587
    auth: {
      user: config.get("EMAIL_USER"),
      pass: config.get("EMAIL_APP_PASSWORD"),
    },
    tls: {
      rejectUnauthorized: false // Helps bypass some network restrictions
    }
  });

  await transporter.sendMail({
    from: `Tasluf Morshed <${config.get("EMAIL_USER")}>`,
    to: email,
    subject: subject,
    html: message,
  });
};

const sendVerificationEmail = async (email, _id) => {
  const token = jwt.sign({ _id }, config.get("JWT_PRIVATE_KEY"), {
    expiresIn: config.get("EMAIL_TOKEN_EXPIRATION_TIME"),
  });

  const subject = "Account Activation Link";
  let BackEndURL = config.get("URL");
  BackEndURL = BackEndURL.endsWith("/") ? BackEndURL : BackEndURL + "/";
  const message = `<h2>Please click on the given link to activate your account. This link will expire in 20 minutes</h2>
  <p>${BackEndURL}api/users/authentication/${token}</p>
  `;

  await sendEmail(email, subject, message);
};

const sendResetPasswordEmail = async (email, _id) => {
  const token = jwt.sign({ _id }, config.get("JWT_PRIVATE_KEY"), {
    expiresIn: config.get("EMAIL_TOKEN_EXPIRATION_TIME"),
  });
  const subject = "Account Password Reset Link";
  let BackEndURL = config.get("URL");
  BackEndURL = BackEndURL.endsWith("/") ? BackEndURL : BackEndURL + "/";
  const message = `<h2>Please click on the given link to reset your account password. This link will expire in 20 minutes</h2>
  <p>${BackEndURL}api/auth/reset-password/${token}</p>
  `;

  // Send the email with the reset token link.
  await sendEmail(email, subject, message);
};

module.exports = { sendResetPasswordEmail, sendVerificationEmail };
