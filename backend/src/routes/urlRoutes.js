import express from "express";
import { createUrl, testUrlRoute } from "../controllers/urlController.js";
import { getUrlsController } from "../controllers/getUrlsController.js";
import { getAnalytics } from "../controllers/getAnalytics.js";
import { checkAuth } from "../middleware/authMiddleware.js";
import { createUrlLimiter } from "../middleware/rateLimiter.js";
import { redirectUrl } from "../controllers/redirectUrlController.js";

const router = express.Router();

router.post("/", checkAuth, createUrlLimiter, createUrl);
router.get("/", checkAuth, getUrlsController);
router.get("/:id/analytics", checkAuth, getAnalytics);
router.get("/test", testUrlRoute);
router.post("/:shortLink", redirectUrl);

export default router;
