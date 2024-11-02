const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
        trim: true,
    },
    prompts: {
        type: [String],
        default: [],
    },
});

module.exports = mongoose.model('User', UserSchema);
