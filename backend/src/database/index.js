const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = async () => {
    await mongoose
    .connect('mongodb://localhost:27017/burnhub', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));
}

module.exports = {connectToDB};
