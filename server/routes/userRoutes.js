import express from "express";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid"; // Add this line to import uuid for generating random strings

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

router.post("/friend", async (req, res) => {
  try {
    const friendData = {
      iss: "referred",
      nbf: Date.now(),
      aud: "",
      sub: uuidv4(), // Generate a random string for sub
      email: req.body.email,
      email_verified: false,
      azp: "",
      name: req.body.name,
      picture: req.body.picture,
      given_name: req.body.given_name,
      family_name: req.body.family_name,
      iat: Date.now(),
      exp: Date.now() + 3600 * 1000, // 1 hour expiration
      jti: "",
      games: [],
      __v: 0,
    };
    const newUser = new User(friendData);
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

router.post("/invite", async (req, res) => {
  const { friendId } = req.body; // Extract friendId from the request body
  const _id = friendId.friendId;
  try {
    const user = await User.findById(_id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "Invalid invitation ID" });
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

export default router;
