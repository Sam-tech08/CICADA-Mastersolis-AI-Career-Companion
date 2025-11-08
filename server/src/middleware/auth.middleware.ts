import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'Missing Authorization header' });
    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid Authorization format' });
    const token = parts[1];
    const payload: any = jwt.verify(token, JWT_SECRET);
    if (!payload || !payload.id) return res.status(401).json({ message: 'Invalid token' });
    const user = await User.findById(payload.id).lean();
    if (!user) return res.status(401).json({ message: 'User not found' });
    (req as any).user = user;
    next();
  } catch (err: any) {
    console.error('auth middleware error:', err?.message || err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
