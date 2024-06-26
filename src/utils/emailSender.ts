require("dotenv").config();
import nodemailer from "nodemailer";
import { User } from "src/database/models/userModel";

export async function sendVerificationEmail(
  user: User,
  verificationLink: string
) {
  // Create a Nodemailer transporter
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });
    // Email content
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.USER,
      to: user.email,
      subject: "Verify your email address",
      html: `Please click <a href="${verificationLink}">here</a> to verify your email address.`,
    };

    // Send email
    const send = await transporter.sendMail(mailOptions);
    return send;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
