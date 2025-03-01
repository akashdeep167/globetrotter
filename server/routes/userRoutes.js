import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let exist = await User.findOne({ sub: req.body.sub });
    if (exist) {
      return res.status(200).json(exist);
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

router.post("/add-game", async (req, res) => {
  try {
    const { sub, game } = req.body;
    console.log(sub, game);
    let user = await User.findOne({ sub });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.games.push(game);
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

export default router;
