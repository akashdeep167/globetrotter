import express from "express";
import Destination from "../models/Destination.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const randomDestination = await Destination.aggregate([
      { $sample: { size: 1 } },
    ]);
    const response = randomDestination[0];
    delete response.city;
    delete response.country;
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/check-answer", async (req, res) => {
  const { _id, ans } = req.body;

  try {
    const destination = await Destination.findOne({ _id });
    if (destination) {
      const isCorrect = destination.city === ans;
      res.json({ isCorrect });
    } else {
      res.status(404).json({ message: "Destination not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
