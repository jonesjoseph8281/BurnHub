// backend/src/index.mjs
import express from 'express';

import dotenv from 'dotenv';
import badAdviceRoutes from './routes/badAdvice.mjs'; // Ensure this is .mjs
// import { connectToDB } from './database/index.mjs'; // Ensure this is .mjs too, if applicable
import cors from 'cors';
import requestRoute from './routes/request.mjs'; // Ensure this is .mjs
import oauthRoute from './routes/oauth.mjs'; // Ensure this is .mjs

dotenv.config();


const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors());

// Use the badAdvice routes
app.use('/bad-advice', badAdviceRoutes);
app.use('/request', requestRoute);
app.use('/auth/google/callback', oauthRoute);
// Other route definitions can go here...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // connectToDB();
    console.log(`Server is running on port ${PORT}`);
});
