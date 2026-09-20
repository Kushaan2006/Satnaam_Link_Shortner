import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import prisma from "./config/prisma.js";
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

// app.get("/:shortLink", redirectUrl);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});

prisma
  .$connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed", err));
