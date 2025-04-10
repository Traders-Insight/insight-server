// src/middleware/validateUser.ts
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
