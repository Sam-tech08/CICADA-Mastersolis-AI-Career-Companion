import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, middleName, lastName, email, password, dob, role, organization } = req.body;

    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      middleName: middleName || '',
      lastName,
      email,
      passwordHash,
      dob: dob ? new Date(dob) : null,
      role: role === 'admin' ? 'admin' : 'candidate',
      organization: organization || ''
    });

    await user.save();

    return res.status(201).json({ message: 'User created', user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error('signup error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash || '');
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

    return res.json({ message: 'Login successful', token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    // user attached by auth middleware
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    return res.json({ user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }});
  } catch (err) {
    console.error('profile error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
// This file handles authentication logic for routes.