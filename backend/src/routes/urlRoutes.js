import express from "express";
import { createUrl, testUrlRoute } from "../controllers/urlController.js";
import { getUrlsController } from "../controllers/getUrlsController.js";
import { getAnalytics } from "../controllers/getAnalytics.js";
import { checkAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", checkAuth, createUrl);
router.get("/", checkAuth, getUrlsController);
router.get("/:id/analytics", checkAuth, getAnalytics);
router.get("/test", testUrlRoute);

export default router;
