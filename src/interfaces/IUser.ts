// Define enums for status
export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending",
}

// Define interfaces for embedded objects
export interface UserProfile {
  avatarUrl?: string;
  bio?: string;
  birthDate?: Date;
  location?: string;
}

export interface UserSecurity {
  emailVerified: boolean;
  verificationToken?: string;
  verificationExpiry?: Date;
  resetPasswordToken?: string;
  resetPasswordExpiry?: Date;
  loginHistory?: Array<{
    timestamp: Date;
    ip: string;
    userAgent: string;
  }>;
}

// Define main User interface
export interface IUser {
  uniqueId: string;
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  roles: string[];
  profile: UserProfile;
  security: UserSecurity;
  verificationCode?: string;
}
