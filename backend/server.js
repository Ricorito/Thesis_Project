import express from "express";
import cookieParser from "cookie-parser";

import "./config/envConfig.js";

import { corsMiddleware } from "./middleware/corsMiddleware.js";

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

import postRoutes from "./routes/articleRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log("Backend server connected successfully!");
  console.log(`Listening at: http://localhost:${PORT}`);
});