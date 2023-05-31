import mongoose, { Document, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  accessToken?: string;
}

const adminSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Email is invalid',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  accessToken: {
    type: String,
  },
});

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
