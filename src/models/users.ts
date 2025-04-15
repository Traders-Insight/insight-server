import { Schema, model } from "mongoose";
import { IUser, UserStatus } from "../interfaces/IUser";
import { v4 as uuidv4 } from "uuid";

// Create Mongoose schema
const userSchema = new Schema<IUser>({
  uniqueId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: Object.values(UserStatus),
    default: UserStatus.Pending,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  roles: [
    {
      type: String,
      default: ["user"],
    },
  ],
  profile: {
    avatarUrl: String,
    bio: String,
    birthDate: Date,
    location: String,
  },
  security: {
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationExpiry: Date,
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
    loginHistory: [
      {
        timestamp: Date,
        ip: String,
        userAgent: String,
      },
    ],
  },
  verificationCode: { type: String },
});

// Add timestamps middleware
userSchema.set("timestamps", true);

export const User = model<IUser>("User", userSchema);
