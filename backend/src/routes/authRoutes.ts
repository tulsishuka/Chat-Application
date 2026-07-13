import { Router } from "express";

import {
  login,
  getUsers,
} from "../controllers/authController";

const router = Router();

router.post("/login", login);

router.get("/users", getUsers);

export default router;