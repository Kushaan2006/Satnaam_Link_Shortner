import express from "express";
import {
  loginController,
  logoutController,
  signUpController,
} from "../controllers/authController.js";
import { refreshController } from "../controllers/refreshController.js";
import { checkAuth } from "../middleware/authMiddleware.js";
import { getMeController } from "../controllers/getMeController.js";
import {
  loginLimiter,
  refreshLimiter,
  signUpLimiter,
} from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/signup", signUpLimiter, signUpController);
router.post("/login", loginLimiter, loginController);
router.post("/logout", logoutController);
router.get("/me", checkAuth, getMeController);

router.post("/refresh", refreshLimiter, refreshController);

export default router;
