const express = require("express");
const router = express.Router();
const User = require("../models/Users");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  try {
    const newUser = new User({ firstName, lastName, email, favoriteColor, birthday });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
});

module.exports = router;
