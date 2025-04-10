import { Request, Response } from "express";
import { User } from "../models/users";
import bcrypt from "bcrypt";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }],
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      username: req.body.username || null,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Successful login
    res.status(200).json({
      message: "Login successful",
      user: { uniqueId: user.uniqueId, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
