const express = require("express");
const router = express.Router();
const User = require("../models/users");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
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
