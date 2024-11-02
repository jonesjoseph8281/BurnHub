import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/burnhub', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('MongoDB connection error:', err);
    }
};
