import mongoose, { Document, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import validator from 'validator';

interface IStaff extends Document {
  name: string;
  email: string;
  password: string;
  accessToken?: string;
}

const staffSchema: Schema<IStaff> = new mongoose.Schema({
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
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
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

const Staff = mongoose.model<IStaff>('Staff', staffSchema);

export default Staff;
