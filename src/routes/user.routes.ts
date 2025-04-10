// src/routes/user.routes.ts
import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { validateUser } from "../middleware/validate-user";

const router = Router();

router.post("/create-user", validateUser, createUser);

export default router;
