import { Request, Response, NextFunction } from "express";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password, firstName, lastName, phone } = req.body;

  if (!email || !password || !firstName || !lastName || !phone) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  next();
};

export const validateChangePassword = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    res
      .status(400)
      .json({ message: "Old password and new password are required" });
    return;
  }

  next();
};
