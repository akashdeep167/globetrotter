import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/destinations", destinationRoutes);

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
