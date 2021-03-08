import { model, Schema } from 'mongoose';
import { IUser } from '../interface/userInterface';

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  googleId: {
    type: String
  },
  photo: {
    type: String
  }
});

export default model<IUser>('User', UserSchema);
