import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import taskListRoutes from "./routes/taskListRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));
app.use("/api/tasks", taskRoutes);
app.use("/api/tasklists", taskListRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
