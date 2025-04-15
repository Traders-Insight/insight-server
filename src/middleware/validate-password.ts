import { Request, Response, NextFunction } from "express";

export const validateForgotPassword = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  next();
};
export const validateResetPassword = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, verificationCode, newPassword } = req.body;

  if (!email || !verificationCode || !newPassword) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  if (newPassword.length < 8) {
    res.status(400).json({ message: "Password must be at least 8 characters" });
    return;
  }

  next();
};
