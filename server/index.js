import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import uploadRoutes from "./routes/uploadRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// Enable CORS for frontend domain
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://globetrotter-wruf.onrender.com/", // Ensure this matches your frontend URL
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/upload", uploadRoutes);

// Fix for __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, "../client/dist")));

// Serve index.html at the root URL
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const url = `mongodb+srv://${USERNAME}:${PASSWORD}@globetrotter-1.da1hr.mongodb.net/?retryWrites=true&w=majority&appName=globetrotter-1`;

mongoose
  .connect(url)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection error", error.message);
    console.error("Error details:", error);
  });
