import { strictTransportSecurity } from 'helmet';
import mongoose, { Document, Schema } from 'mongoose';

interface DepartmentDocument extends Document {
  branch: string;
  batch: number;
  totalStudentsIntake: number;
  totalStudents:number
}

const departmentSchema = new Schema<DepartmentDocument>({
  branch: {
    type: String,
    required: true,
    unique:true
  },
  batch: {
    type: Number,
    required: true,
  },
  totalStudentsIntake: {
    type: Number,
    required: true,
  },
  totalStudents: {
    type: Number,
    required:true
  }
});

const Department = mongoose.model<DepartmentDocument>('Department', departmentSchema);

export default Department;
