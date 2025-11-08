import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  passwordHash?: string;
  dob?: Date | null;
  role: 'candidate' | 'admin';
  organization?: string;
  googleId?: string | null;
  createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true, default: '' },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, default: '' },
  dob: { type: Date, required: false },
  role: { type: String, enum: ['candidate', 'admin'], default: 'candidate' },
  organization: { type: String, trim: true, default: '' },
  googleId: { type: String, unique: true, sparse: true, default: null },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
// This file defines the User model schema for MongoDB. 
// It is intentionally left blank for now.