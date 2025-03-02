import cloudinary from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Controller for image upload
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "globetrotter",
      use_filename: true,
      unique_filename: false,
    });

    // Remove the file from disk
    fs.unlink(req.file.path, (err) => {
      if (err) console.error(`Failed to delete file: ${req.file.path}`, err);
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);

    // Remove the file from disk if an error occurs
    fs.unlink(req.file.path, (err) => {
      if (err) console.error(`Failed to delete file: ${req.file.path}`, err);
    });

    res.status(500).json({ error: "Failed to upload image" });
  }
};
