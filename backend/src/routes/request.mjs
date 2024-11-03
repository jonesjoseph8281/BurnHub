// backend/src/routes/request.mjs
import express from 'express';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://burn-hub-frontend.vercel.app');
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');

    const redirectUrl = 'https://burn-hub.onrender.com/auth/google/callback';
    
    const oAuthClient = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    );

    const authorizeUrl = oAuthClient.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
        prompt: 'consent'
    });

    res.json({ url: authorizeUrl });
});

export default router; // Change to export default
