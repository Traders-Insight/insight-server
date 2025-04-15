import { Request, Response } from "express";
import { User } from "../models/users";
import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const verificationCode = crypto.randomInt(100000, 999999).toString();
  user.verificationCode = verificationCode;
  await user.save();

  await transporter.sendMail({
    to: email,
    subject: "Password Reset Verification Code",
    text: `Your verification code is ${verificationCode}.`,
    html: `<p>Your verification code is <strong>${verificationCode}</strong>.</p>`,
  });
  res.status(200).json({
    message: "Verification code sent to your email",
  });
};
