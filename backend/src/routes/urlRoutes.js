import express from "express";
import { createUrl, testUrlRoute } from "../controllers/urlController.js";

const router = express.Router();

router.post("/", createUrl);
router.get("/test", testUrlRoute);

export default router;
