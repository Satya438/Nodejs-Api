const express = require("express");
const nodemailer = require("nodemailer");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.json());

// Generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(10000 + Math.random() * 80000);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "satyabodapati0008@gmail.com",
    pass: "nrscxixdmpymofoi",
  },
});

const otpMap = new Map();

app.post("/send-otp", (req, res) => {
  if (!req.body || !req.body.email) {
    return res.status(400).json({ error: "Invalid request" });
  }
  const email = req.body.email;

  // Generate OTP
  const otp = generateOTP();

  // Store OTP in the map
  otpMap.set(email, otp.toString());

  // Create email message
  const mailOptions = {
    from: "satyabodapati0008@gmail.com",
    to: email,
    subject: "Email Verification OTP",
    text: `Your verification OTP is: ${otp}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send OTP" });
    } else {
      res.json({ message: "OTP sent successfully" });
    }
  });
});

app.listen(3000, () => {
  console.log("server running");
});
