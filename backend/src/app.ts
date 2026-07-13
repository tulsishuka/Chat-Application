import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);

export default app;