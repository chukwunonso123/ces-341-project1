const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/userModel'); // Adjust the path if necessary

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback",
    scope: ['user:email'] // Ensure the OAuth scope includes access to emails
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Extract name and email from the GitHub profile
      const { name, email } = profile._json;

      if (!email) {
        // If no email is provided by GitHub, return an error or handle accordingly
        return done(null, false, { message: 'Email is required to sign up.' });
      }

      // Check if the user already exists in the database
      let user = await User.findOne({ email });

      if (!user) {
        // If user doesn't exist, create a new user with GitHub data
        user = new User({
          name: name || 'Default Name', // Fallback to 'Default Name' if GitHub doesn't provide one
          email,
        });

        await user.save();
      }

      // Proceed with the authentication process
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

module.exports = passport;
