// server/routes/protectedRoute.js
import express from 'express';
import passport from 'passport';
import '../passportConfig.js'; // Ensure passportConfig is imported

const router = express.Router();

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

export default router;