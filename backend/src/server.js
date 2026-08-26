import express from "express";
import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { redirectUrl } from "./controllers/redirectUrlController.js";
const app = express();

app.use(express.json());

app.use("/api/urls", urlRoutes);

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/:shortLink", redirectUrl);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
