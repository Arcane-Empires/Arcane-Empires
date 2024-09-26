// server/routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import '../passportConfig.js'; // Ensure passportConfig is imported
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

router.post(
    '/login',
    [
      body('email').isEmail(),
      body('password').exists()
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({ message: info ? info.message : 'Login failed', user });
        }
  
        req.login(user, { session: false }, (err) => {
          if (err) {
            res.send(err);
          }
          
          const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
          return res.json({ token });
        });
      })(req, res, next);
    }
);



export default router;