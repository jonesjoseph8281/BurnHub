import mongoose from 'mongoose';

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

export default mongoose.model('User', UserSchema);
