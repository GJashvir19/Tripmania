import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

function createToken(user) {
  return jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET || 'tripmania-development-secret', { expiresIn: '7d' });
}

function profile(user) {
  return { id: user._id, name: user.name, email: user.email, homeState: user.homeState, travelStyle: user.travelStyle };
}

router.post('/signup', async (request, response, next) => {
  try {
    const { name, email, password, homeState, travelStyle } = request.body;
    if (!name || !email || !password) return response.status(400).json({ message: 'Name, email and password are required.' });
    if (password.length < 8) return response.status(400).json({ message: 'Use at least 8 characters for your password.' });
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return response.status(409).json({ message: 'An account with this email already exists.' });
    const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12), homeState, travelStyle });
    return response.status(201).json({ token: createToken(user), user: profile(user) });
  } catch (error) {
    return next(error);
  }
});

router.post('/signin', async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
      return response.status(401).json({ message: 'Email or password is incorrect.' });
    }
    return response.json({ token: createToken(user), user: profile(user) });
  } catch (error) {
    return next(error);
  }
});

router.get('/me', requireAuth, async (request, response, next) => {
  try {
    const user = await User.findById(request.user.id);
    return response.json({ user: profile(user) });
  } catch (error) {
    return next(error);
  }
});

export default router;
