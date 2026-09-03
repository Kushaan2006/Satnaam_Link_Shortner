import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { redirectUrl } from "./controllers/redirectUrlController.js";
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/:shortLink", redirectUrl);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
