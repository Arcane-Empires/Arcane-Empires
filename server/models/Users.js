// server/models/User.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    characters: [{
        type: Schema.Types.ObjectId,
        ref: 'Character',
    }],
}, {
    timestamps: true,
});

const User = model('User', userSchema);

export default User;