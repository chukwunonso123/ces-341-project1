const express = require('express');
const passport = require('passport');
const router = express.Router();

// Protected Route
router.get('/', passport.authenticate('google', { session: false }), (req, res) => {
  res.send('This is a protected route, only accessible to authenticated users.');
});

module.exports = router;
