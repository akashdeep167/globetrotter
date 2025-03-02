import express from "express";
import { uploadImage } from "../controllers/uploadController.js"; // Ensure the correct file extension
import upload from "../middleware/uploadMiddleware.js"; // Ensure the correct file extension

const router = express.Router();

// Route to upload image to Cloudinary
router.post("/", upload.single("image"), uploadImage); // Ensure the field name is "image"

export default router;
