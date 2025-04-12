const express = require('express');
const router = express.Router();
const passport = require('passport');

// GitHub OAuth route
router.get('/auth/github', passport.authenticate('github'));

// GitHub OAuth callback route
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successfully authenticated, redirect to a protected route
    res.redirect('/dashboard');  // Redirect to a page where user info is shown
  }
);

module.exports = router;
