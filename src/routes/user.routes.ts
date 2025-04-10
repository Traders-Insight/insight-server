import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller";
import { validateUser, validateLogin } from "../middleware/validate-user";

const router = Router();

router.post("/create-user", validateUser, createUser);
router.post("/login", validateLogin, loginUser);

export default router;
