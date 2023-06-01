import mongoose, { Document, Schema } from 'mongoose';

interface StudentDocument extends Document {
  regNum: string;
  name: string;
  phoneNumber: string;
  department: string;
  Batch: number;
  currentSem: number;
  attendance : Schema.Types.ObjectId
}

const studentSchema = new Schema<StudentDocument>({
  regNum: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  Batch: {
    type: Number,
    required: true,
  },
  currentSem: {
    type: Number,
    required: true,
  },
  attendance: [{
    type: Schema.Types.ObjectId,
    ref: "Attendance"
  }]
});


const Student = mongoose.model<StudentDocument>('Student', studentSchema);

export default Student;
