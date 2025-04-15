import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller";
import { forgotPassword } from "../controllers/password.controller";
import {
  validateUser,
  validateLogin,
  validateChangePassword,
} from "../middleware/validate-user";
import { validateForgotPassword } from "../middleware/validate-password";
// import { authenticateJWT } from "../middleware/auth";
// import { changePassword } from "../controllers/users-flows.controller";

const router = Router();

router.post("/create-user", validateUser, createUser);
router.post("/login", validateLogin, loginUser);

router.post("/forgot-password", validateForgotPassword, forgotPassword);

// Defines the change password route
// router.post(
//   "/change-password",
//   authenticateJWT,
//   validateChangePassword,
//   changePassword
// );

export default router;
