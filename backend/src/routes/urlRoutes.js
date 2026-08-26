import express from "express";
import { createUrl, testUrlRoute } from "../controllers/urlController.js";
import { getUrlsController } from "../controllers/getUrlsController.js";
import { getAnalytics } from "../controllers/getAnalytics.js";

const router = express.Router();

router.post("/", createUrl);
router.get("/", getUrlsController);
router.get("/:id/analytics", getAnalytics);
router.get("/test", testUrlRoute);

export default router;
