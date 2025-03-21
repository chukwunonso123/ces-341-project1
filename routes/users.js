const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/Users'); // Ensure you have a User model

// ✅ GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ GET a single user by ID
router.get('/:id', async (req, res) => {-id 
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
