const express = require('express');
const router = express.Router();
const Contact = require('../models/users');

// ✅ GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST new contact
router.post('/', async (req, res) => {
    try {
      const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  
      // Validate required fields
      if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ message: "❌ All fields are required." });
      }
  
      const newContact = new Contact({
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
      });
  
      const savedContact = await newContact.save();
      res.status(201).json({ message: "✅ Contact created successfully", contact: savedContact });
  
    } catch (err) {
      console.error("❌ Error creating contact:", err.message);
      res.status(500).json({ message: "❌ Error creating contact", error: err.message });
    }
  });
  

// ✅ PUT (update) contact
router.put('/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) return res.status(404).json({ message: "Contact not found" });
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE contact
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "✅ Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "❌ Error deleting contact", error: err.message });
  }
});


module.exports = router;
