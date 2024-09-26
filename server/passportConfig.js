// server/passportConfig.js
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
// import User from './models/User'; // Adjust the path as necessary

// Local strategy for username and password login
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    console.log("hit passconfig")
    // TODO - find user by email
    // const user = await User.findOne({ email });
    const user = { _id: '123', email: 'jonnysmith696910@gmail.com', password: 'password123' }
    if (!user) {
      console.log("no user")
      return done(null, false, { message: 'Incorrect email.' });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = (user.password == password);
    if (!isMatch) {
      console.log("no match")
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (error) {
    console.log(error)
    console.log("error")
    return done(error);
  }
}));

// JWT strategy for token verification
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
}, async (jwtPayload, done) => {
  try {
    // const user = await User.findById(jwtPayload.userId);
    const user = { _id: '123' };
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));


export default passport;