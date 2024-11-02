const express = require('express');
const cors = require('cors');
const requestRouter = require('./routes/request');
const oauthRouter = require('./routes/oauth');
const dotenv = require('dotenv');
const {connectToDB} = require('./database');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/request', requestRouter);
app.use('/auth/google/callback', oauthRouter);

// Start server
app.listen(PORT, () => {
    connectToDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
