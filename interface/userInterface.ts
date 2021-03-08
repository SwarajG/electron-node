import { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  dob?: Date,
  googleId?: string;
  photo?: string;
}