import mongoose from 'mongoose';
import {User} from '../../types/user.type.js';

export interface UserDocument extends User, mongoose.Document {}

const userSchema = new mongoose.Schema({
  email: String,
  avatarPath: String,
  firstname: String,
  lastname: String,
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
