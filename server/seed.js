import mongoose from "mongoose";
import Destination from "./models/Destination.js"; // Import model
import { destinations } from "./data.js";
import dotenv from "dotenv";
dotenv.config();
// Replace with your actual MongoDB Atlas URI
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const url = `mongodb+srv://${USERNAME}:${PASSWORD}@globetrotter-1.da1hr.mongodb.net/?retryWrites=true&w=majority&appName=globetrotter-1`;

// Function to seed the database
const seedDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB...");

    // Clear existing destinations
    await Destination.deleteMany({});
    console.log("Existing destinations deleted...");

    // Insert new destinations
    await Destination.insertMany(destinations);
    console.log("Database seeded successfully!");

    mongoose.connection.close(); // Close connection after seeding
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

// Run the seed function
seedDB();
