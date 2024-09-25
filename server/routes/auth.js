// server/routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
// import User from '../models/User'; // Assuming you have a User model

const router = express.Router();

router.post(
    '/register', 
    [
        body('email').isEmail(),
        body('password').isLength({ min: 6 })
    ], 
    async (req, res) => {
        console.log();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('error: empty');
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            console.log('hello');
            // const hashedPassword = await bcrypt.hash(password, 10);
            console.log(email)
            console.log(password)
            // const user = new User({ email, password: hashedPassword });
            // await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
);

router.post(
    '/login', 
    [
        body('email').isEmail(),
        body('password').isLength({ min: 6 })
    ], 
    async (req, res) => {
        console.log();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            // const hashedPassword = await bcrypt.hash(password, 10);
            console.log(email)
            console.log(password)
            // const user = new User({ email, password: hashedPassword });
            // await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
);


export default router;