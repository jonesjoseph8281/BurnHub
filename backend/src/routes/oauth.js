const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const User = require('../database/schemas/user'); // Import the User model
const fetch = require('node-fetch'); // Ensure node-fetch is installed

router.get('/', async (req, res) => {
    const code = req.query.code;
    const redirectUrl = 'http://localhost:5173/oauth';

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'http://localhost:3000/auth/google/callback'
    );

    try {
        // Get tokens with the authorization code
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        // Fetch user data from Google API
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`);
        const userData = await response.json();

        const { name: username, email } = userData; // Extract name and email from Google data

        // Check if the user already exists in the database
        let user = await User.findOne({ email });
        if (!user) {
            // If user does not exist, create a new user
            user = new User({ username, email });
            await user.save();
            console.log('New user created:', user);
        } else {
            console.log('User already exists:', user);
        }

        // Redirect to the frontend with user data (you can add it as query params if needed)
        res.redirect(redirectUrl);
    } catch (err) {
        console.error('Error with Google OAuth:', err);
        res.status(500).send('Authentication error');
    }
});

module.exports = router;
