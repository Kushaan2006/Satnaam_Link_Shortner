import express from "express";
import {
  loginController,
  logoutController,
  signUpController,
} from "../controllers/authController.js";
import { refreshController } from "../controllers/refreshController.js";
import { checkAuth } from "../middleware/authMiddleware.js";
import { getMeController } from "../controllers/getMeController.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/me", checkAuth, getMeController);

router.post("/refresh", refreshController);

export default router;
