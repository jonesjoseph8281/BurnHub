// backend/src/routes/badAdvice.mjs
import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post('/', async (req, res) => {
    const { prompt } = req.body;

    try {
        console.log('noice');
        const response = await model.generateContent(`Give sarcastic replies and bad advices: ${prompt}`);

        res.json({ advice: response.response.text() }); // Adjust based on the response structure
    } catch (error) {
        console.error("Error fetching advice from Gemini AI:", error);
        res.status(500).json({ error: "Failed to fetch advice" });
    }
});

export default router;
