// server/models/Character.js
const mongoose = require('mongoose');
import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        enum: ['Warrior', 'Mage', 'Archer', 'Healer'],
        required: true,
    },
    level: {
        type: Number,
        default: 1,
    },
    experience: {
        type: Number,
        default: 0,
    },
    health: {
        type: Number,
        default: 100,
    },
    stamina: {
        type: Number,
        default: 100,
    },
    mana: {
        type: Number,
        default: 50,
    },
    inventory: {
        type: [String],
        default: [],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

const Character = mongoose.model('Character', characterSchema);

export default Character;
