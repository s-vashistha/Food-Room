import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import "dotenv/config";

// App config
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// Register API Routes
app.use("/api", router); // ✅ Ensures all API endpoints start with /api

// Default Route for Debugging
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start Server
app.listen(port, () => console.log(`🚀 Server started on http://localhost:${port}`));
